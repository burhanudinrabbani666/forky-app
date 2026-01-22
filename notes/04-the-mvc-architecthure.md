# THE MVC ARCHITECTHURE

1. **STRUCTURE**: Like a house, software needs a structure: the way we organize our code.
2. **MAINTAINBILITY**: A project is never done! We need to be able to easily change it in the future.
3. **EXPANDABILITY**: We also need to be able to easily add new features.

- We can create our own architecture (Mapty project)
- We can use a well-established architecture pattern like MVC, MVP, Flux, etc. (this project)
- We can use a framework like React, Angular, Vue, Svelte, etc.

## COMPONENT OF ANY ARCHITECTURE

### BUSSINESS LOGIC

- Code that solves the actual business problem;
- Directly related to what business does and what it needs;
- Example: sending messages, storing transactions, calculating taxes, …

### STATE

- Essentially stores all the data about the application
- Should be the “single source of truth”
- UI should be kept in sync with the state
- State libraries exist

### HTTP LIBRARY

- Responsible for making and receiving AJAX requests
- Optional but almost always necessary in real-world apps

### APPLICATION LOGIC (ROUTER)

- Code that is only concerned about the **implementation of application itself**
- Handles navigation and UI events

### PRESENTATION LOGIC (UI LAYER)

- Code that is concerned about the visiable part of the application
- Essentially displays application state

## MODEL, VIEW, CONTROLLER

![mvc](/src/img/mvc.png)
![mvc](/src/img/flowchart/forkify-architecture-recipe-loading.png)

[Next: Helper and configuration function](./05-helper-and-configuration-function.md)
