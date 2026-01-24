import icons from "url:../../img/icons.svg"; // PARCEL: V.2

export default class View {
  _recipeViewData;

  render(data) {
    this._recipeViewData = data;
    this._parentElement.innerHTML = this._generateHtml();
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
