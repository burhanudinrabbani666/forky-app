# IMPLEMENT ERROR AND SUCCESS MESSAGE

```js
  renderErrorMessage(message = this.#errorMessage) {
    const html = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;

    this.#parentElement.innerHTML = html;
  }

  renderMessage() {
    const html = `
            <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${this.#successMessage}</p>
        </div>

    `;

    this.#parentElement.innerHTML = html;
  }
```

[Next: Implement search result](./08-impplement-search-result.md)
