# DEVELOPING DOM ALGORITHM

```js
update(data) {
    this._recipeViewData = data;
    const newHtml = this._generateHtml();

    const newDOM = document.createRange().createContextualFragment(newHtml);
    const newElement = Array.from(newDOM.querySelectorAll("*"));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll("*"),
    );

    newElement.forEach((newEl, index) => {
      const currentEl = currentElement[index];

      // UPDATE TEXT
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        console.log(newEl.firstChild.nodeValue.trim(), "💥");
        currentEl.textContent = newEl.textContent;
      }

      // UPDATE ATTRIBUTES
      if (!newEl.isEqualNode(currentEl))
        Array.from(newEl.attributes).forEach((attr) =>
          currentEl.setAttribute(attr.name, attr.value),
        );
    });
  }
```

[Next: Implement bookmark](./11-implement-bookmark.md)
