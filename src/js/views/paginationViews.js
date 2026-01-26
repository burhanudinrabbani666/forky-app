import View from "./view";
import icons from "url:../../img/icons.svg"; // PARCEL: V.2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateHtml() {
    const currentPage = this._recipeViewData.page;
    const numPage = Math.ceil(
      this._recipeViewData.results.length / this._recipeViewData.resultPerPage,
    );

    // page 1, and there are other page
    if (currentPage === 1 && numPage > 1) {
      return `
          <button class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>
      `;
    }

    // last page
    if (currentPage === numPage && numPage > 1) {
      return `
      <button class="btn--inline pagination__btn--next">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
      </button>
      `;
    }
    // other page
    if (currentPage < numPage) {
      return `
          <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage + 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>

      `;
    }

    // page 1, and there no other page
    return ``;
  }
}

export default new PaginationView();
