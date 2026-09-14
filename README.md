# lab10.3-Context-API — Todo App

## About

This project is a **Todo application** built as part of a **Per Scholas** lab assignment. This lab focuses on mastering React's **Context API** for state management.

## Live Demo

The application is hosted and can be accessed at:

**[https://chadgarc.github.io/lab10.3-Context-API/](https://chadgarc.github.io/lab10.3-Context-API/)**

## Features

### 📝 Todo Management

- **Add, edit, and delete**: todo items
- **Toggle completion**: status with a checkbox
- **Edit task text**: inline via an edit mode
- **Clear all completed**: todos at once
- **Persistent storage**: todos survive page reloads via `localStorage`

### 🔍 Filtering

- Filter todos by **All**, **Active**, or **Completed**
- Filter preference persists across sessions
- Real-time filtering applied in the todo list

### 🌗 Theme Switching

- Toggle between **Light** and **Dark** themes
- Theme preference persists via `localStorage`
- Powered by **DaisyUI** component library with `data-theme` attribute

### 🏗️ Architecture

- Built with **React Context API** for global state management
- **TypeScript** throughout for type safety
- **Tailwind CSS + DaisyUI** for styling
- Centralized provider pattern via `Providers.tsx`

---

## How It Works

The application uses three independent context providers, each managing a separate slice of state. All providers are aggregated in a single `Providers` component so that every child component can access state and actions via custom hooks.

```
Providers
├── ThemeProvider      → ThemeContext        (light/dark)
├── TodoContextProvider → TodoContext         (todos CRUD)
└── FilterProvider     → FilterContext       (all/active/completed)
```

---

## How the Hooks Work

### `useContext`

**What it does:** Allows any component to read the current state and dispatch actions from a React Context without passing props through the entire component tree.

**Why it was needed:** In a traditional React app, you would need to pass data and callbacks as "prop drilling" through every intermediate component. For example, to get the current theme in `ThemeToggleButton`, you'd have to pass it from `App` down through multiple layers. `useContext` eliminates this by letting any component inside the Provider tree access the context directly — no prop passing required.

**Usage pattern:**

```tsx
const { theme, toggleTheme } = useThemeContext();
```

Every custom hook in this project (`useThemeContext`, `useFilterContext`, `useTodoListContext`) wraps `useContext` with a safety check to throw an error if the component is used outside its Provider.

---

### `useReducer`

**What it does:** Manages complex state with multiple update operations through a single `dispatch` function. It takes a **reducer function** and an **initial state**, and returns `[state, dispatch]`.

**Why it was needed instead of `useState`:** When you have multiple related state updates (add, remove, toggle, edit, clear completed), `useState` forces you to define each update as a separate setter function that manually copies and mutates the array. This leads to repeated patterns and potential bugs. `useReducer` centralizes **all state transition logic** into one pure function — the reducer — where each `action.type` determines exactly how the state changes.

**Benefits in this project:**

- **Single source of truth** for how state changes — the `switch` statement in `todoReducer`
- **Predictability** — given the same state and action, it always returns the same new state
- **Maintainability** — adding a new action type only requires a new `case` in the reducer, not new setter functions scattered across components
- **Testability** — the reducer is a pure function that can be tested independently

**Usage pattern:**

```tsx
const [state, dispatch] = useReducer(todoReducer, initialState);
const addTodo = (task: string) => dispatch({ type: "ADD_TODO", payload: task });
```

Components call `dispatch` with action objects rather than direct state setters, keeping the UI layer decoupled from state logic.

---

### How `useContext` and `useReducer` Work Together

The two hooks are complementary:

1. **`useReducer`** lives inside the Provider — it owns the state and the dispatch function
2. **`useContext`** lives inside consuming components — it gives access to the state and dispatch wrappers

```
Context.Provider value={{ todoList, addTodo, ... }}
        │
        │  useTodoListContext() → useContext(TodoContext)
        │
        ▼
  Component uses { addTodo } to dispatch actions
```

The Provider holds `useReducer`'s state and dispatchers. Consumers access them via `useContext` through a thin custom hook wrapper.

---

## Project Structure

```
src/
├── contexts/
│   ├── ThemeContext.tsx      → Theme state + toggleTheme
│   ├── FilterContext.tsx     → Filter state + setFilter
│   └── TodoContext.tsx       → Todo CRUD via useReducer
├── components/
│   ├── App.tsx               → Root component, wires everything
│   ├── Providers.tsx         → Aggregates all context providers
│   ├── ThemeToggleButton.tsx → Light/dark theme toggle
│   ├── FilterButtons.tsx     → All/Active/Completed filter buttons
│   ├── TodoInput.tsx         → Form to add/edit todos
│   ├── TodoList.tsx          → Renders filtered todo items + footer
│   └── TodoItem.tsx          → Single todo with checkbox, edit, delete
├── types/
│   └── index.ts              → All TypeScript interfaces and types
└── main.tsx                  → Entry point
```

---

## Technical Stack

| Technology       | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| **React**        | UI library with hooks for state management               |
| **TypeScript**   | Static typing for interfaces and function signatures     |
| **Context API**  | Global state management without external libraries       |
| **useReducer**   | Complex todo state transitions                           |
| **Tailwind CSS** | Utility-first CSS styling                                |
| **DaisyUI**      | Component library built on Tailwind (toggle, dock, etc.) |
| **Vite**         | Build tool and dev server                                |
| **localStorage** | Persistence for todos and theme preference               |
