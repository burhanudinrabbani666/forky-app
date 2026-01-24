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
