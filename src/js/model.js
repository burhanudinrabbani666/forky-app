import { API_URL, RESULT_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

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

    if (state.bookmarks.some((bookmark) => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
    //
  } catch (error) {
    throw error;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}/?search=${query}`);
    state.search.page = 1;
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

export function getSearchResultPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage; //0
  const end = page * state.search.resultPerPage; //9

  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  console.log(newServings);
  // 1. UPDATE INGREDIENTS
  state.recipe.ingredients.forEach(
    (ingredient) =>
      (ingredient.quantity =
        (ingredient.quantity * newServings) / state.recipe.servings),
  );

  // 2. UPDATE NEW SERVINGS
  state.recipe.servings = newServings;
}

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
