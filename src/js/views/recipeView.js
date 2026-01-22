import icons from "url:../../img/icons.svg"; // PARCEL: V.2

class recipeView {
  #parentElement = document.querySelector(".recipe");
  #recipeViewData;

  render(data) {
    this.#recipeViewData = data;
    this.#parentElement.innerHTML = this.#generateHtml();
  }

  #generateHtml() {
    return `
        <figure class="recipe__fig">
          <img src="${this.#recipeViewData.image}" alt="${this.#recipeViewData.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#recipeViewData.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#recipeViewData.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#recipeViewData.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.#recipeViewData.ingredients
              .map((ingredient) => {
                return `
                    <li class="recipe__ingredient">
                      <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                      </svg>
                      <div class="recipe__quantity">${ingredient.quantity}</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${ingredient.unit}</span>
                        ${ingredient.description}
                      </div>
                    </li>              
              `;
              })
              .join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#recipeViewData.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#recipeViewData.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  renderSpiner() {
    const html = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this.#parentElement.innerHTML = html;
  }
}

export default new recipeView();
