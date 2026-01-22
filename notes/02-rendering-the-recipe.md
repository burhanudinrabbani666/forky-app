# RENDERING THE RECIPE

ALways renderin list with `.map()` build-in method

```js
`
${recipe.ingredients
  .map((ingredient) => {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="src/img/icons.svg#icon-check"></use>
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

`;
```

Import icons in parcel v.2 way

```js
import icons from "url:../img/icons.svg"; // PARCEL: V.2
import "core-js/stable";
import "regenerator-runtime/runtime.js";
// 1. CHANGE EVERY PATH A ICON (src/img/icons.svg) TO ==> ${icons}. THIS IS THE PARCEL WAY

function renderSpiner(parentElement) {
  const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use> 
          </svg>
        </div>
  `;
  parentElement.innerHTML = html;
}
```

[Next: Listening load and hash change](./03-listening-load-and-hash-change.md)
