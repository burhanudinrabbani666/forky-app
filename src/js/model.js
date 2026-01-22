export const state = {
  recipe: {},
};

export async function loadRecipe(recipeId) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`,
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

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
    alert(error);
  }
}
