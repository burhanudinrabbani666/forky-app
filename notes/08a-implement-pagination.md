# IMPLEMENT PAGINATION

create function for knowing waht page gonna render

```js
export function getSearchResultPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage; //0
  const end = page * state.search.resultPerPage; //9

  return state.search.results.slice(start, end);
}
```

creating subcribe and publisher pattern for click event

```js
function controlPagination(goToPage) {
  // 1. RENDER NEW RESULT
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2. RENDER NEW PAGINATION
  paginationViews.render(model.state.search);
}

function init() {
  paginationViews.addHandleClick(controlPagination);
}

init();
```

`paginationVies.js`

```js
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

```

[Next: Updating recipe](./09-updating-recipe.md)
