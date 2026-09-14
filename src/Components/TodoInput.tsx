import { useState } from "react";
import { useTodoListContext } from "../contexts/TodoContext";

interface TodoInputProps {
    initialValue?: string;
    buttonText?: string;
    onSave?: (task: string) => void;
}

export function TodoInput({ initialValue = '', buttonText = 'Add task', onSave }: TodoInputProps = {}) {
    const [input, setInput] = useState(initialValue);
    const { addTodo } = useTodoListContext();

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