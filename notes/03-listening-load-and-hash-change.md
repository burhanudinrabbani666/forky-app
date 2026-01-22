# LISTENING LOAD AND HASH CHANGE

for more not hard code the request, we can make eventListener to catch something change in windows. in this case is `hash`, that can make rendering any reecipe depends in what `hash` is change.

```js
// 1. When Hash changed
// 2. When you paste the URL with hash in it

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, showRecipe),
);
```

```js
  try {
    // GET ID BY HASH IN WINDOWS
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    // RENDERNG SPINNNER WHILE WAITING API CALL ARIVE
    renderSpiner(recipeContainer);

    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`,
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

//....

```

[Next: The mvc architecthure](./04-the-mvc-architecthure.md)
