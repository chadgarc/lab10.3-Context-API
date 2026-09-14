import { useState } from "react";
import { useTodoListContext } from "../contexts/TodoContext";

export function TodoInput(){
    const [input, setInput] = useState('');
    const { addTodo } = useTodoListContext();

    const handleSubmit = () => {
        if (input.trim() !== '') addTodo(input);
        setInput('');
    };

    return (
        <section className="flex gap-2">
            <label className="floating-label">
                <input type="text"
                placeholder="Input"
                onChange={(e) => setInput(e.target.value)}
                className="input h-10 w-80 lg:w-150" value={input} />
                <span>Task</span>
            </label>
            <button
            className="btn hover:btn-info hover:text-white"
            onClick={handleSubmit}
            >Add task</button>
        </section>
    )
}