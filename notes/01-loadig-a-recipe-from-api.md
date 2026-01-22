# LOADING A RECIPE FROM API

get data from:

- [https://forkify-api.jonas.io/](https://forkify-api.jonas.io/)

```js
const showRecipe = async function () {
  try {
    const res = await fetch(
      "https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8704", // CHECKING FOR ANOTHER API CALL
      // "https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886",
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    // DESTRUCTURING
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};

showRecipe();
```

[Next: Rendering the recipe](./02-rendering-the-recipe.md)
