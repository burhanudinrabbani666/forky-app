import View from "./view";
import previewView from "./previewView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _recipeViewData;
  _errorMessage = "No recipies for your query. Please try Again 😀";

  _generateHtml() {
    const results = this._recipeViewData
      .map((result) => previewView.render(result, false))
      .join("");

    return results;
  }
}

export default new ResultsView();
