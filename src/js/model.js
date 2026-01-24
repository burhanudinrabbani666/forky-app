import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
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
  } catch (error) {
    throw error;
  }
}

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
