import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime.js";
// 1. CHANGE EVERY PATH A ICON (src/img/icons.svg) TO ==> ${icons}. THIS IS THE PARCEL WAY

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function showRecipe() {
  try {
    // GET ID BY HASH IN WINDOWS
    const recipeId = window.location.hash.slice(1);

    // RENDERNG SPINNNER WHILE WAITING API CALL ARIVE
    recipeView.renderSpiner();
    if (!recipeId) return;

    // 1) LOADING RECIPE
    await model.loadRecipe(recipeId);

    // 2) RENDERING RECIPE
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
}

showRecipe();

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, showRecipe),
);
