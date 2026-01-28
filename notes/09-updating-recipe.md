## UPDATING RECIPE

![NEW FLOWCHART](/src/img/flowchart/forkify-flowchart-part-2.png)

```jsx
addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", (event) => {
      const btn = event.target.closest(".btn--update-servings");
      if (!btn) return;
      const updateTo = Number(btn.dataset.updateto);

      if (updateTo > 0) handler(updateTo);
    });
}
```

```jsx
export function updateServings(newServings) {
  console.log(newServings);
  // 1. UPDATE INGREDIENTS
  state.recipe.ingredients.forEach(
    (ingredient) =>
      (ingredient.quantity =
        (ingredient.quantity * newServings) / state.recipe.servings),
  );

  // 2. UPDATE NEW SERVINGS
  state.recipe.servings = newServings;
}
```

[Next: Developing dom alghortihm](./10-developing-dom-alghortihm.md)
