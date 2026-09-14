import { createContext, useContext, useReducer, useEffect } from "react";
import type { TodoListContextType, TodoAction, TodoState } from "../Types";

/**
 * React context for managing the application's todo list state.
 * Provides access to the todo array and all CRUD operations.
 */
const TodoContext = createContext<TodoListContextType | undefined>(undefined);

/**
 * Pure reducer function that handles all todo state transitions.
 *
 * A reducer takes the current state and an action object, then returns
 * a new state based on the action type. This centralizes all state
 * update logic in one place, making it easier to reason about and test.
 *
 * The reducer is a pure function: given the same state and action,
 * it always returns the same new state. It never mutates the existing state
 * but returns a new object using the spread operator.
 *
 * @param {TodoState} state - The current application state.
 * @param {TodoAction} action - The action describing what happened.
 * @returns {TodoState} A new state object reflecting the changes.
 */
function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        /**
         * ADD_TODO: Creates a new todo item with a unique id,
         * the provided task text, and isCompleted set to false.
         * Increments lastId to ensure future todos have unique ids.
         */
        case 'ADD_TODO': {
            const newId = state.lastId + 1;
            return {
                ...state,
                lastId: newId,
                todoList: [...state.todoList, { id: newId.toString(), task: action.payload, isCompleted: false }]
            };
        }
        /**
         * REMOVE_TODO: Filters out the todo with the matching id,
         * returning a new array without that item.
         */
        case 'REMOVE_TODO': {
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload)
            };
        }
        /**
         * TOGGLE_TODO: Maps over the todoList and toggles the isCompleted
         * boolean for the todo whose id matches the action payload.
         * All other todos remain unchanged.
         */
        case 'TOGGLE_TODO': {
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
                )
            };
        }
        /**
         * EDIT_TODO: Maps over the todoList and replaces the task text
         * for the todo whose id matches action.payload.id.
         */
        case 'EDIT_TODO': {
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
                )
            };
        }
        /**
         * CLEAR_COMPLETED: Filters the todoList to keep only todos
         * where isCompleted is false, removing all completed items.
         */
        case 'CLEAR_COMPLETED': {
            return {
                ...state,
                todoList: state.todoList.filter((todo) => !todo.isCompleted)
            };
        }
        default:
            return state;
    }
}

/**
 * Loads the persisted todo list from localStorage on initial load.
 * If no saved data exists, defaults to an empty array.
 */
const prevList = localStorage.getItem('todoList');

/**
 * Initial state for the reducer, derived from localStorage data.
 * Restores both the todoList and the lastId counter to maintain
 * unique id generation after page reload.
 */
const initialState: TodoState = {
    todoList: prevList ? JSON.parse(prevList) : [],
    lastId: Number(prevList ? JSON.parse(prevList)[JSON.parse(prevList).length - 1]?.id : 0)
};

/**
 * TodoContextProvider component that wraps the application subtree with todo state.
 *
 * Uses React's useReducer hook instead of useState because todo state has
 * multiple interrelated update operations (add, remove, toggle, edit, clear).
 * useReducer centralizes all state logic into a single reducer function,
 * making the code more maintainable and predictable.
 *
 * The useEffect hook persists the todoList to localStorage whenever it changes,
 * ensuring todos survive page reloads.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that will have access to todo context.
 * @returns {JSX.Element} The TodoContext.Provider wrapping the children.
 */
export function TodoContextProvider({ children }: { children: React.ReactNode }) {
    /**
     * useReducer hook manages the todo state.
     * - `state` contains { todoList, lastId }
     * - `dispatch` is a function used to send actions to the reducer
     * Each action is an object with a `type` and optional `payload`
     */
    const [state, dispatch] = useReducer(todoReducer, initialState);

    /**
     * useEffect hook that persists the current todoList to localStorage
     * whenever the todoList changes. This ensures todos survive page reloads.
     */
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(state.todoList));
    }, [state.todoList]);

    /**
     * Action dispatchers — thin wrapper functions that create action objects
     * and call dispatch. Components call these instead of dispatch directly,
     * keeping the UI layer decoupled from the state logic.
     */
    const addTodo = (task: string) => dispatch({ type: 'ADD_TODO', payload: task });
    const removeTodo = (id: string) => dispatch({ type: 'REMOVE_TODO', payload: id });
    const updateTodoStatus = (id: string) => dispatch({ type: 'TOGGLE_TODO', payload: id });
    const updateTodoTask = (id: string, task: string) => dispatch({ type: 'EDIT_TODO', payload: { id, task } });
    const clearCompletedTodos = () => dispatch({ type: 'CLEAR_COMPLETED' });

    return (
        <TodoContext.Provider value={{ todoList: state.todoList, addTodo, removeTodo, updateTodoStatus, updateTodoTask, clearCompletedTodos }}>
            {children}
        </TodoContext.Provider>
    )
}

/**
 * Custom hook to access the todo context.
 * Must be called inside a TodoContextProvider component.
 * Throws a descriptive error if used outside a provider.
 *
 * @returns {TodoListContextType} An object containing the todoList array and all CRUD functions.
 */
export const useTodoListContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoListContext must be used within TodoContextProvider');
    }
    return context;
}
