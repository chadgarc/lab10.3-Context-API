import { createContext, useContext, useState, useEffect } from "react";
import type { TodoListContextType, Todo } from "../Types";

const TodoContext = createContext<TodoListContextType | undefined>(undefined);

const prevList = localStorage.getItem('todoList');

export function TodoContextProvider({ children }: { children: React.ReactNode }) {
    const [todoList, setTodoList] = useState<Todo[]>(prevList ? JSON.parse(prevList) : []);
    const [lastId, setLastId] = useState<number>(Number(todoList[todoList.length - 1]?.id) || 0);

    const addTodo = (task: string) => {
        setLastId(lastId + 1);
        setTodoList([...todoList, { id: (lastId + 1).toString(), task, isCompleted: false }]);
    }

    const removeTodo = (id: string) => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    const updateTodoStatus = (id: string) => {
        setTodoList(todoList.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    }

    const updateTodoTask = (id: string, task: string) => {
        setTodoList(todoList.map((todo) => todo.id === id ? { ...todo, task } : todo));
    }

    const clearCompletedTodos = () => {
        setTodoList(todoList.filter((todo) => !todo.isCompleted));
    }

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    return (
        <TodoContext.Provider value={{ todoList, addTodo, removeTodo, updateTodoStatus, updateTodoTask, clearCompletedTodos }}>
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
