import icons from "url:../../img/icons.svg"; // PARCEL: V.2

export default class View {
  _recipeViewData;

  render(data) {
    if (data.length === 0) return this.renderErrorMessage();

    this._recipeViewData = data;
    this._parentElement.innerHTML = this._generateHtml();
  }

  update(data) {
    this._recipeViewData = data;
    const newHtml = this._generateHtml();

    const newDOM = document.createRange().createContextualFragment(newHtml);
    const newElement = Array.from(newDOM.querySelectorAll("*"));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll("*"),
    );

    newElement.forEach((newEl, index) => {
      const currentEl = currentElement[index];

      // UPDATE TEXT
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        currentEl.textContent = newEl.textContent;
      }

      // UPDATE ATTRIBUTES
      if (!newEl.isEqualNode(currentEl))
        Array.from(newEl.attributes).forEach((attr) =>
          currentEl.setAttribute(attr.name, attr.value),
        );
    });
  }

  renderSpiner() {
    const html = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._parentElement.innerHTML = html;
  }

  renderErrorMessage(message = this._errorMessage) {
    const html = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;

    this._parentElement.innerHTML = html;
  }

  renderMessage() {
    const html = `
            <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${this._successMessage}</p>
        </div>

    `;

    this._parentElement.innerHTML = html;
  }
}
