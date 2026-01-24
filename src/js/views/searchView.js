class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInputFields();
    return query;
  }

  _clearInputFields() {
    return (this._parentElement.querySelector(".search__field").value = "");
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
