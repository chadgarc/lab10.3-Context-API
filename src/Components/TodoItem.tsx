import { useState } from "react";
import { useTodoListContext } from "../contexts/TodoContext";
import type { Todo } from "../Types";
import { TodoInput } from "./TodoInput";

/**
 * TodoItem component renders a single todo item with its checkbox,
 * task text, edit button, and delete button.
 *
 * Uses the `useTodoListContext` hook to access the CRUD functions:
 * - `updateTodoStatus` — toggles completion (called by checkbox)
 * - `removeTodo` — deletes the todo (called by delete button)
 * - `updateTodoTask` — updates the task text (called by edit mode)
 *
 * Manages its own local `isEditing` state via useState to toggle
 * between display mode and edit mode. When editing, it renders
 * a TodoInput component in edit mode (with `onSave` callback).
 *
 * The component receives `id`, `task`, and `isCompleted` as props
 * from the Todo list, matching the `Todo` interface from Types/index.ts.
 *
 * @param {Todo} props - The todo data: id, task, and isCompleted status.
 * @returns {JSX.Element} A list item with checkbox, task text, and action buttons.
 */
export function TodoItem({ id, task, isCompleted }: Todo) {
    const { updateTodoStatus, removeTodo, updateTodoTask } = useTodoListContext();  
    const [isEditing, setIsEditing] = useState(false);

    /**
     * Handles the task update when the user edits a todo in edit mode.
     * Calls `updateTodoTask` to dispatch an EDIT_TODO action, then
     * exits edit mode.
     *
     * @param {string} newTask - The updated task text.
     */
    const handleUpdate = (newTask: string) => {
        updateTodoTask(id, newTask);
        setIsEditing(false);
    };

    return (
        <li className="flex justify-between items-center h-15">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => updateTodoStatus(id)}
            />
            {isEditing ? (
                <div className="ms-5 w-full">
                    <TodoInput
                        initialValue={task}
                        buttonText="Update"
                        onSave={handleUpdate}
                    />
                </div>
            ) : (
                <div className="text-left w-full ms-5">{task}</div>
            )}
            <section className="flex gap-5">
                <button onClick={() => setIsEditing(!isEditing)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button onClick={() => removeTodo(id)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </section>
        </li>
    )
}
