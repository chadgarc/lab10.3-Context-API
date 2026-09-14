import { useTodoListContext } from "../contexts/TodoContext";
import { useFilterContext } from "../contexts/FilterContext";
import { TodoItem } from "./TodoItem";

/**
 * TodoList component renders the list of todo items based on the current
 * filter selection, and displays the count of remaining active items
 * along with a "Clear Completed" button.
 *
 * Uses two hooks:
 * - `useTodoListContext` to access the todoList array and `clearCompletedTodos` function
 * - `useFilterContext` to access the current filter value
 *
 * The filtering logic maps over todoList and conditionally renders
 * each TodoItem based on the current filter:
 * - 'all' renders every todo
 * - 'active' renders only incomplete todos
 * - 'completed' renders only completed todos
 *
 * @returns {JSX.Element} A div containing the todo list and footer controls.
 */
export function TodoList(){
    const {todoList, clearCompletedTodos} = useTodoListContext();
    const {filter} = useFilterContext();

    return (
        <div className="px-10 flex flex-col justify-between">
            <ul className="flex flex-col overflow-scroll h-195 lg:h-170 gap-2 w-full pt-5">
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
