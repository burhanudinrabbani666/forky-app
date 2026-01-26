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

[Next: Updating recipe](./09-updating-recipe.md)
