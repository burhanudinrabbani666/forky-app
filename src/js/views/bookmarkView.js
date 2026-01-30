import View from "./view";
import previewView from "./previewView";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it 😀";

  _generateHtml() {
    console.log(this._recipeViewData);
    const results = this._recipeViewData
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");

    return results;
  }
}

export default new BookmarkView();
