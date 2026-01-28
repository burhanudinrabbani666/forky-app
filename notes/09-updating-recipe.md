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
