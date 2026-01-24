import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime.js";

async function showRecipe() {
  try {
    // GET ID BY HASH IN WINDOWS
    const recipeId = window.location.hash.slice(1);

    // RENDERNG SPINNNER WHILE WAITING API CALL ARIVE
    if (!recipeId) return;
    recipeView.renderSpiner();

    // 1) LOADING RECIPE
    await model.loadRecipe(recipeId);

    // 2) RENDERING RECIPE
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderErrorMessage();
  }
}

async function controlSearcResults() {
  try {
    // 1) GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // 2) LOAD SEARCH QUERY
    await model.loadSearchResults(query);

    // 3) RENDER RESULTS

    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
}

function init() {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(controlSearcResults);
}

init();
