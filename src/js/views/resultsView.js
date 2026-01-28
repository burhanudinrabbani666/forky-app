import View from "./view";
import icons from "url:../../img/icons.svg"; // PARCEL: V.2

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _recipeViewData;
  _errorMessage = "No recipies for your query. Please try Again 😀";

  _generateHtml() {
    const results = this._recipeViewData
      .map(this._generateHtmlPreview)
      .join("");

    return results;
  }

  _generateHtmlPreview(result) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${id === result.id ? "preview__link--active" : ""}" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
