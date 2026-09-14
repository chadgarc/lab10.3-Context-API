/**
 * @fileoverview Central type definitions for the Todo App.
 * All interfaces and types are exported and imported by context files,
 * components, and hooks throughout the application.
 */

/**
 * Represents a single todo item.
 * @interface
 * @property {string} id - Unique identifier for the todo item.
 * @property {string} task - The text content of the todo.
 * @property {boolean} isCompleted - Whether the todo has been completed.
 */
export interface Todo {
    id: string;
    task: string;
    isCompleted: boolean;
}

/**
 * Defines the shape of the ThemeContext value.
 * @interface
 * @property {'light' | 'dark'} theme - Current theme state.
 * @property {() => void} toggleTheme - Function to toggle between light and dark themes.
 */
export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

/**
 * Defines the shape of the FilterContext value.
 * @interface
 * @property {'all' | 'active' | 'completed'} filter - Current filter state.
 * @property {(filter: 'all' | 'active' | 'completed') => void} setFilter - Function to change the filter.
 */
export interface FilterContextType {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: FilterContextType['filter']) => void;
}

/**
 * Defines the shape of the TodoContext value provided to consumers.
 * @interface
 * @property {Todo[]} todoList - The array of all todo items.
 * @property {(task: string) => void} addTodo - Adds a new todo item.
 * @property {(id: string) => void} removeTodo - Removes a todo by id.
 * @property {(id: string) => void} updateTodoStatus - Toggles completion status of a todo.
 * @property {(id: string, task: string) => void} updateTodoTask - Updates the task text of a todo.
 * @property {() => void} clearCompletedTodos - Removes all completed todos.
 */
export interface TodoListContextType {
    todoList: Todo[];
    addTodo: (task: string) => void;
    removeTodo: (id: string) => void;
    updateTodoStatus: (id: string) => void;
    updateTodoTask: (id: string, task: string) => void;
    clearCompletedTodos: () => void;
}

/**
 * Discriminated union type representing all possible actions dispatched to the todo reducer.
 * @typedef {Object} TodoAction
 * @property {'ADD_TODO'} type - Action type for adding a new todo.
 * @property {string} payload - The task text for the new todo.
 * @property {'REMOVE_TODO'} type - Action type for removing a todo.
 * @property {string} payload - The id of the todo to remove.
 * @property {'TOGGLE_TODO'} type - Action type for toggling completion status.
 * @property {string} payload - The id of the todo to toggle.
 * @property {'EDIT_TODO'} type - Action type for editing a todo's task.
 * @property {{ id: string; task: string }} payload - The id and new task text.
 * @property {'CLEAR_COMPLETED'} type - Action type for clearing completed todos.
 */
export type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'REMOVE_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: string }
    | { type: 'EDIT_TODO'; payload: { id: string; task: string } }
    | { type: 'CLEAR_COMPLETED' };

/**
 * Represents the complete state shape managed by the todo reducer.
 * @interface
 * @property {Todo[]} todoList - Array of all todo items.
 * @property {number} lastId - The last used id, used to generate unique ids for new todos.
 */
export interface TodoState {
    todoList: Todo[];
    lastId: number;
}
