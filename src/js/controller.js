import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationViews from "./views/paginationViews.js";

import "core-js/stable";
import "regenerator-runtime/runtime.js";

async function controlShowRecipe() {
  try {
    // GET ID BY HASH IN WINDOWS
    const recipeId = window.location.hash.slice(1);

    // RENDERNG SPINNNER WHILE WAITING API CALL ARIVE
    if (!recipeId) return;
    recipeView.renderSpiner();

    // 0. UPDATE RESULTS VIEW TO MARK SELECTED SEARCH RESULTS
    resultsView.update(model.getSearchResultPage());

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
    resultsView.render(model.getSearchResultPage());

    // 4) RENDER INITIAL PAGINATON
    paginationViews.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}

function controlPagination(goToPage) {
  // 1. RENDER NEW RESULT
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2. RENDER NEW PAGINATION
  paginationViews.render(model.state.search);
}

function controlServings(newServings) {
  // 1. UPDATE THE RECIPE SERVINGS (IN STATE)
  model.updateServings(newServings);

  // 2. UPDATE THE RECIPE VIEW
  recipeView.update(model.state.recipe);
}

function initial() {
  recipeView.addHandlerRender(controlShowRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearcResults);
  paginationViews.addHandleClick(controlPagination);
}

initial();
