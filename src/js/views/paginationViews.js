import View from "./view";
import icons from "url:../../img/icons.svg"; // PARCEL: V.2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandleClick(handler) {
    this._parentElement.addEventListener("click", (event) => {
      // 1. GET DOM
      const btn = event.target.closest(".btn--inline");
      if (!btn) return;

      // 2. GET DATA FROM DATA SET
      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateHtml() {
    const currentPage = this._recipeViewData.page;
    const numPage = Math.ceil(
      this._recipeViewData.results.length / this._recipeViewData.resultPerPage,
    );

    // page 1, and there are other page
    if (currentPage === 1 && numPage > 1) {
      return this._button("next", currentPage);
    }

    // last page
    if (currentPage === numPage && numPage > 1) {
      return this._button("prev", currentPage);
    }
    // other page
    if (currentPage < numPage) {
      return `
      ${this._button("next", currentPage)}
      ${this._button("prev", currentPage)}    
      `;
    }

    // page 1, and there no other page
    return ``;
  }

  _button(arrow, currentPage) {
    const numberPage = arrow === "next" ? currentPage + 1 : currentPage - 1;
    const arrowIcon = arrow === "next" ? "right" : "left";

    return `
        <button class="btn--inline pagination__btn--${arrow}" data-goto="${numberPage}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrowIcon}"></use>
          </svg>
          <span>Page ${numberPage}</span>
        </button>
    `;
  }
}

export default new PaginationView();
