import { createContext, useContext, useReducer, useEffect } from "react";
import type { TodoListContextType, TodoAction, TodoState } from "../Types";

const TodoContext = createContext<TodoListContextType | undefined>(undefined);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        case 'ADD_TODO': {
            const newId = state.lastId + 1;
            return {
                ...state,
                lastId: newId,
                todoList: [...state.todoList, { id: newId.toString(), task: action.payload, isCompleted: false }]
            };
        }
        case 'REMOVE_TODO': {
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload)
            };
        }
        case 'TOGGLE_TODO': {
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
                )
            };
        }
        case 'EDIT_TODO': {
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
                )
            };
        }
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

const prevList = localStorage.getItem('todoList');
const initialState: TodoState = {
    todoList: prevList ? JSON.parse(prevList) : [],
    lastId: Number(prevList ? JSON.parse(prevList)[JSON.parse(prevList).length - 1]?.id : 0)
};

export function TodoContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(state.todoList));
    }, [state.todoList]);

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

export const useTodoListContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoListContext must be used within TodoContextProvider');
    }
    return context;
}
