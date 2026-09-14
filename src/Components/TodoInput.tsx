import { useState } from "react";
import { useTodoListContext } from "../contexts/TodoContext";

/**
 * Props interface for the TodoInput component.
 * @interface TodoInputProps
 * @property {string} [initialValue] - Optional initial text for the input field.
 * @property {string} [buttonText] - Optional text for the submit button.
 * @property {(task: string) => void} [onSave] - Optional callback for when a task is saved,
 *   used by TodoItem's edit mode instead of calling addTodo directly.
 */
interface TodoInputProps {
    initialValue?: string;
    buttonText?: string;
    onSave?: (task: string) => void;
}

/**
 * TodoInput component renders a form with a text input and submit button
 * for adding new todo items.
 *
 * Uses the `useTodoListContext` hook to access the `addTodo` function.
 * Manages its own local `input` state via useState to track the text field value.
 * On submit, validates that the input is non-empty, then calls `addTodo`
 * to dispatch an ADD_TODO action to the reducer, and clears the input.
 *
 * When `onSave` prop is provided (used in TodoItem edit mode), it calls
 * the `onSave` callback instead of `addTodo`, keeping the component
 * reusable for both adding and editing tasks.
 *
 * @param {TodoInputProps} props - Component props.
 * @returns {JSX.Element} A form with an input field and a submit button.
 */
export function TodoInput({ initialValue = '', buttonText = 'Add task', onSave }: TodoInputProps = {}) {
    const [input, setInput] = useState(initialValue);
    const { addTodo } = useTodoListContext();

    /**
     * Handles form submission. Prevents default form reload behavior,
     * trims whitespace from the input, and validates it's non-empty.
     * If `onSave` is provided, delegates to it; otherwise calls `addTodo`.
     *
     * @param {React.FormEvent} [e] - Optional form event.
     */
    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = input.trim();
        if (trimmed === '') return;

        if (onSave) {
            onSave(trimmed);
        } else {
            addTodo(trimmed);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <label className="floating-label">
                <input type="text"
                placeholder="Input"
                onChange={(e) => setInput(e.target.value)}
                className="input h-10 w-80 lg:w-150" value={input} />
                <span>Task</span>
            </label>
            <button
            type="submit"
            className="btn hover:btn-info hover:text-white"
            >{buttonText}</button>
        </form>
    )
}
