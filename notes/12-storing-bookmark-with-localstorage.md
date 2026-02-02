# Storing Bookmarks with Local Storage

This section explains how bookmarks are **persisted across page reloads** using the browser’s `localStorage`. The goal is to make sure that bookmarked recipes remain available even after the application is refreshed.

The implementation follows a clear flow:

1. Persist bookmarks whenever they change
2. Restore bookmarks when the application loads
3. Render restored bookmarks immediately on page load

## Overview

Without local storage, bookmarks only live in memory and disappear on refresh. By syncing `state.bookmarks` with `localStorage`, we ensure:

- Bookmarks survive page reloads
- Application state is restored automatically
- UI stays consistent with saved data

## 1. Persisting Bookmarks to Local Storage

Whenever bookmarks are added or removed, the updated bookmarks array is saved to `localStorage` using the key **"bookmarks"**.

### Persistence Helper (Model)

```js
function persistBookmaark() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}
```

**Key idea:**

- `localStorage` only stores strings
- `JSON.stringify` converts the bookmarks array into a storable format

### Saving on Add Bookmark

```js
export function addBookmarked(recipe) {
  // REACT WAY
  state.bookmarks = [...state.bookmarks, recipe];

  // MARK CURRENT RECIPE AS BOOKMARK
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmaark();
}
```

**Flow explanation:**

1. Add the recipe to `state.bookmarks`
2. Sync the `bookmarked` flag on the current recipe
3. Persist the updated bookmarks to `localStorage`

### Saving on Delete Bookmark

```js
export function deleteBookmark(id) {
  state.bookmarks = state.bookmarks.filter((recipe) => recipe.id !== id);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmaark();
}
```

**Flow explanation:**

1. Remove the recipe from `state.bookmarks`
2. Update the `bookmarked` flag if needed
3. Persist the new bookmarks state

## 2. Restoring Bookmarks on Application Load

When the application starts, bookmarks are read from `localStorage` and restored into the application state.

### Initialization Logic (Model)

```js
function init() {
  const storage = localStorage.getItem("bookmarks");

  if (storage) state.bookmarks = JSON.parse(storage);
}

init();
console.log(state.bookmarks);
```

**Key idea:**

- Read stored data once at startup
- Parse the stored JSON back into a JavaScript array
- Initialize `state.bookmarks` before any rendering happens

This makes bookmarks immediately available to the rest of the app.

## 3. Rendering Bookmarks on Page Load

The bookmark view listens for the browser’s `load` event to trigger an initial render.

### Bookmark View

```js
addHandleRender(handler) {
    window.addEventListener("load", handler);
  }
```

This ensures that bookmarks are rendered **as soon as the page finishes loading**.

## 4. Application Initialization Order (Controller)

The controller wires everything together and defines the startup sequence.

```js
function controllBookmark() {
  bookmarkView.render(model.state.bookmarks);
}

function initial() {
  bookmarkView.addHandleRender(controllBookmark); // set first render

  recipeView.addHandlerRender(controlShowRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandleBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearcResults);
  paginationViews.addHandleClick(controlPagination);
}

initial();
```

**Startup flow:**

1. Model initializes bookmarks from `localStorage`
2. `window.load` event fires
3. `controllBookmark()` renders saved bookmarks
4. Other handlers are registered for user interactions

This guarantees bookmarks appear immediately after reload.

## 5. Data Flow Summary

**On bookmark add/remove:**

- Update `state.bookmarks`
- Persist to `localStorage`
- UI updates via controller

**On page reload:**

- Read bookmarks from `localStorage`
- Initialize application state
- Render bookmarks on load

[Next: Updating new recipe](./13-updating-new-recipe.md)
