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

export type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'REMOVE_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: string }
    | { type: 'EDIT_TODO'; payload: { id: string; task: string } }
    | { type: 'CLEAR_COMPLETED' };

export interface TodoState {
    todoList: Todo[];
    lastId: number;
}