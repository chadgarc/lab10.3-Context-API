export interface Todo {
    id: string;
    task: string;
    isCompleted: boolean;
}

export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export interface FilterContextType {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: FilterContextType['filter']) => void;
}

export interface TodoListContextType {
    todoList: Todo[];
    addTodo: (task: string) => void;
    removeTodo: (id: string) => void;
    updateTodoStatus: (id: string) => void;
    updateTodoTask: (id: string, task: string) => void;
    clearCompletedTodos: () => void;
}