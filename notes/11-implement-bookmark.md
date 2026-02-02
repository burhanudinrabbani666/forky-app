# Implement Bookmark Feature

This section documents the **bookmark feature flow** in a clear, future‑friendly way. The goal is to explain _why_ each piece exists and _how_ data flows between the controller, model, and state — without changing any of the existing code.

## Overview

The bookmark feature allows users to:

- Add a recipe to bookmarks
- Remove a recipe from bookmarks
- Instantly reflect the bookmark state in the UI

To achieve this, we:

1. Add a `bookmarked` property to each loaded recipe
2. Control bookmark actions through a controller function
3. Centralize bookmark state management inside the model

## 1. Controller Logic

The controller is responsible for **responding to user actions** and coordinating between the model and the view.

### Updating Servings (Reference)

This function already exists and serves as a pattern for how controllers should work:

```js
function controlServings(newServings) {
  // 1. UPDATE THE RECIPE SERVINGS (IN STATE)
  model.updateServings(newServings);

  // 2. UPDATE THE RECIPE VIEW
  recipeView.update(model.state.recipe);
}
```

### Bookmark Controller

The bookmark controller toggles the bookmark state of the currently loaded recipe.

```js
function controlBookmark() {
  console.log(model.state.recipe.bookmarked);

  if (!model.state.recipe.bookmarked) model.addBookmarked(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
}
```

**Flow explanation:**

1. Check if the current recipe is already bookmarked
2. If not bookmarked → add it to bookmarks
3. If bookmarked → remove it from bookmarks
4. Update the recipe view so the UI reflects the change

## 2. Adding the `bookmarked` Property

Each time a recipe is loaded, we attach a `bookmarked` property to it. This allows the UI to:

- Render the correct bookmark icon
- Know whether the recipe is saved or not

### Recipe Loader

```js
export async function loadRecipe(recipeId) {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);

    // DESTRUCTURING
    const { recipe: recipeAPI } = data.data;
    state.recipe = {
      id: recipeAPI.id,
      title: recipeAPI.title,
      publisher: recipeAPI.publisher,
      sourceUrl: recipeAPI.source_url,
      image: recipeAPI.image_url,
      servings: recipeAPI.servings,
      cookingTime: recipeAPI.cooking_time,
      ingredients: recipeAPI.ingredients,
    };

    // THIS CHECKING ALSO ADDING BOOKMARKED PROPERTI
    if (state.bookmarks.some((bookmark) => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
    //
  } catch (error) {
    throw error;
  }
}
```

**Key idea:**

- Every recipe _always_ has a `bookmarked` property
- Its value depends on whether the recipe exists in `state.bookmarks`

This ensures consistent behavior across renders.

## 3. Bookmark State Management (Model)

The model is the **single source of truth** for bookmarks.

### Add Bookmark

```js
export function addBookmarked(recipe) {
  // React way
  state.bookmarks = [...state.bookmarks, recipe];

  // Makr current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
}
```

**What happens here:**

- A new bookmarks array is created (immutable update)
- The current recipe’s `bookmarked` flag is synchronized

### Delete Bookmark

```js
export function deleteBookmark(id) {
  state.bookmarks = state.bookmarks.filter((recipe) => recipe.id !== id);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
}
```

**What happens here:**

- The recipe is removed from bookmarks by ID
- The current recipe’s `bookmarked` flag is reset if necessary

## 4. Data Flow Summary

**User clicks bookmark button →**

1. `controlBookmark()` runs
2. Model updates `state.bookmarks`
3. `state.recipe.bookmarked` is updated
4. `recipeView.update()` re-renders the UI

This keeps **state, logic, and UI fully synchronized**.

[Next: Storing bookmark with localstorage](./12-storing-bookmark-with-localstorage.md)
