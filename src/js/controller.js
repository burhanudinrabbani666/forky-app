import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime.js";

if (module.hot) {
  module.hot.accept();
}

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
    resultsView.renderSpiner();

    // 1) GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // 2) LOAD SEARCH QUERY
    await model.loadSearchResults(query);

    // 3) RENDER RESULTS
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
}

function init() {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(controlSearcResults);
}

init();
