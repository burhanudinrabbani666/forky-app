import View from "./view";

class PreviewView extends View {
  _parentElement = "";

  _generateHtml() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${id === this._recipeViewData.id ? "preview__link--active" : ""}" href="#${this._recipeViewData.id}">
          <figure class="preview__fig">
            <img src="${this._recipeViewData.image}" alt="${this._recipeViewData.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._recipeViewData.title}</h4>
            <p class="preview__publisher">${this._recipeViewData.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
