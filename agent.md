# Agent Instructions — Todo App (Context API)

## 📌 Project Overview

This project is a Todo application built using React and the Context API.  
The app manages:

- Todo items
- Visibility filters
- Theme switching (light/dark)
- Persistence using localStorage

Your job as the agent is to review, improve, and help implement the project according to the requirements below.

---

## 🟦 Contexts Required

### 1. TodoContext

**State:**

- todos: Array<{ id, text, completed }>

**Actions:**

- addTodo(text)
- toggleTodo(id)
- deleteTodo(id)
- editTodo(id, newText)
- clearCompleted()

**Components using this context:**

- TodoInput
- TodoList
- TodoItem

---

### 2. FilterContext

**State:**

- filter: 'all' | 'active' | 'completed'

**Actions:**

- setFilter(filter)

**Components using this context:**

- FilterButtons
- TodoList (must filter based on current filter)

---

### 3. ThemeContext

**State:**

- theme: 'light' | 'dark'

**Actions:**

- toggleTheme()

**Components using this context:**

- ThemeToggleButton
- App container (apply theme styles)

---

## 🟩 Persistence Requirements

Persist the following in localStorage:

- todos
- theme

On app load:

- Rehydrate state from localStorage

On updates:

- Automatically update localStorage

---

## 🟪 Hooks Required

- createContext
- useContext
- useState
- useReducer (recommended for TodoContext)
- useEffect (for persistence)
- useMemo (optional optimization)
- useCallback (optional optimization)

---

## 🟫 Project Structure (recommended)

```bash
src/
├── contexts/
│   ├── TodoContext.tsx
│   ├── FilterContext.tsx
│   └── ThemeContext.tsx
├── components/
│   ├── TodoInput.tsx
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   ├── FilterButtons.tsx
│   └── ThemeToggleButton.tsx
├── providers/
│   └── AppProviders.tsx
└── App.tsx
```

---

## ⭐ Agent Tasks (what you should help with)

- Review context implementations
- Suggest improvements to reducers or state logic
- Ensure components consume context correctly
- Verify filtering logic
- Verify theme switching logic
- Ensure persistence works correctly
- Optimize re-renders when needed
- Help debug issues
- Help write missing components
- Help refactor code for clarity

---

## 🧪 Checklist for Progress Review

- [ ] TodoContext implemented
- [ ] add/toggle/delete/edit/clearCompleted working
- [ ] FilterContext implemented
- [ ] Filtering applied in TodoList
- [ ] ThemeContext implemented
- [ ] Theme applied to UI
- [ ] Todos persisted to localStorage
- [ ] Theme persisted to localStorage
- [ ] Rehydration on load
- [ ] Providers wrap the app correctly
- [ ] Components consume context properly
- [ ] Code is clean and organized

---

## 🎓 Grading Criteria (Rubric)

**TypeScript (30 pts)**

- Correct types, interfaces, no errors

**Components (30 pts)**

- Clean structure, correct props, reusable

**Form Handling (20 pts)**

- Input validation, UX, error handling

**State Management (15 pts)**

- Correct updates, clean logic, no unnecessary re-renders

**Documentation / Clean Code (5 pts)**

- Comments, readability, organization

---

## 📝 Notes for the Agent

- Follow the project requirements strictly.
- Suggest improvements but keep the original architecture.
- When editing files, apply minimal diffs.
- When creating new files, follow the recommended structure.
- Always check for TypeScript correctness.
