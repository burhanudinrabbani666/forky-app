# IMPLEMENT SEARCH RESULTS

we need state to store the results from api. also need a model function to proccess query. and create another class for only proccesing the search event.

`searchView.js`

```js
class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInputFields();
    return query;
  }

  #clearInputFields() {
    return (this.#parentElement.querySelector(".search__field").value = "");
  }
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
```

`model.js`

```js
export const state = {
  recipe: {},
  search: {
    // NEW STATE FOR STORING RESULTS
    query: "",
    results: [],
  },
};

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}/?search=${query}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {}
}
```

[Next: Implement pagination](./08a-implement-pagination.md)
