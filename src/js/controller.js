import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime.js";
// 1. CHANGE EVERY PATH A ICON (src/img/icons.svg) TO ==> ${icons}. THIS IS THE PARCEL WAY

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
    console.error(error);
  }
}

function init() {
  recipeView.addHandlerRender(showRecipe);
}

init();
