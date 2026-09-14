import { useTodoListContext } from "../contexts/TodoContext";
import { useFilterContext } from "../contexts/FilterContext";
import { TodoItem } from "./TodoItem";

export function TodoList(){
    const {todoList, clearCompletedTodos} = useTodoListContext();
    const {filter} = useFilterContext();

    return (
        <div className="px-10 flex flex-col justify-between mt-2">
            <ul className="flex flex-col overflow-scroll h-195 lg:h-170 gap-2 w-full">
                {todoList.map(todo => {
                    if (filter === 'all') return <TodoItem key={todo.id} {...todo} />
                    if (filter === 'active') return !todo.isCompleted && <TodoItem key={todo.id} {...todo} />
                    if (filter === 'completed') return todo.isCompleted && <TodoItem key={todo.id} {...todo} />
                })}
            </ul>
            <section className="flex justify-between mb-15 mt-5">
                <div>
                    <p>{todoList.filter(todo => !todo.isCompleted).length} items Left</p>
                </div>
                {todoList.filter(todo => todo.isCompleted).length > 0 &&
                    <button className="text-blue-500 underline-offset-4" onClick={clearCompletedTodos}>
                        Clear Completed {todoList.filter(todo => todo.isCompleted).length}
                    </button>}
            </section>
        </div>
    )
}