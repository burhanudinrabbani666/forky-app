# IMPLEMENT BOOKMARK

create function controller to add bookmark to modal

```js
function controlServings(newServings) {
  // 1. UPDATE THE RECIPE SERVINGS (IN STATE)
  model.updateServings(newServings);

  // 2. UPDATE THE RECIPE VIEW
  recipeView.update(model.state.recipe);
}

function controlBookmark() {
  console.log(model.state.recipe.bookmarked);

  if (!model.state.recipe.bookmarked) model.addBookmarked(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
}
```

and make every recipe that get clicked new properti: `bookmarked` so we can use later for rendering icon or unbookmarked

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

and this modal is allow us to add change bookmarked value

```js
export function addBookmarked(recipe) {
  // React way
  state.bookmarks = [...state.bookmarks, recipe];

  // Makr current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
}
export function deleteBookmark(id) {
  state.bookmarks = state.bookmarks.filter((recipe) => recipe.id !== id);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
}
```
