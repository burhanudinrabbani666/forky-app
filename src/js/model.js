import { API_URL, RESULT_PER_PAGE } from "./config";
import { getJSON, sendJson } from "./helper";

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
    const data = await getJSON(`${API_URL}${recipeId}`);

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
    const data = await getJSON(`${API_URL}?search=${query}`);
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

function persistBookmaark() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export function addBookmarked(recipe) {
  // REACT WAY
  state.bookmarks = [...state.bookmarks, recipe];

  // MARK CURRENT RECIPE AS BOOKMARK
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmaark();
}

export function deleteBookmark(id) {
  state.bookmarks = state.bookmarks.filter((recipe) => recipe.id !== id);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmaark();
}

function init() {
  const storage = localStorage.getItem("bookmarks");

  if (storage) state.bookmarks = JSON.parse(storage);
}

init();

export async function uploadRecipe(newRecipe) {
  console.log(Object.entries(newRecipe));

  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingeredients format! Please use the correct format :)",
          );

        const [quantity, unit, decription] = ingArr;

        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          decription,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };

    sendJson(`${API_URL}`);
  } catch (error) {
    throw error;
  }
}
