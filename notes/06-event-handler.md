# EVENT HANDLER IN MVC: PUBLISHER - SUBCRIBER PATTERN

![](../src/img/flowchart/forkify-architecture-recipe-loading.png)

```js
// PUBLISHER: views/recipeView.js
class recipeView {
  // .............

  addHandlerRender(handleFunction) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handleFunction),
    );
  }

  //............
}

// SUBCRIBER: controller.js
function init() {
  recipeView.addHandlerRender(showRecipe);
}

init();
```

[Next: Implement error and success message](./07-implement-error-and-success-message.md)
