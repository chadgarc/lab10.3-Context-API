import { Providers } from './Providers';
import { ThemeToggleButton } from './Components/ThemeToggleButton';
import { FilterButtons } from './Components/FilterButtons';
import { TodoInput } from './Components/TodoInput';
import { TodoList } from './Components/TodoList';

/**
 * Root App component of the Todo application.
 *
 * Structure:
 * 1. `<Providers>` wraps the entire app, nesting all three context providers
 *    (ThemeContext, TodoContext, FilterContext) so every child component
 *    can access them via custom hooks.
 * 2. `<div className="mockup-browser">` is a DaisyUI browser mock component
 *    that provides the visual container for the app.
 * 3. `<div className="mockup-browser-toolbar">` contains the header (title)
 *    and the ThemeToggleButton for switching themes.
 * 4. `<section>` contains the three main components:
 *    - TodoInput for adding new todos
 *    - TodoList for displaying filtered todos
 *    - FilterButtons for controlling visibility filtering
 *
 * @returns {JSX.Element} The root component of the Todo application.
 */
function App() {
  return (
    <Providers>
      <div className="mockup-browser border border-base-300 w-full">
        <div className="mockup-browser-toolbar flex justify-between">
          <h4 className='font-bold'>To Do App</h4>
          <ThemeToggleButton />
        </div>
        <section className='w-full'>
          <TodoInput />
          <TodoList />
          <FilterButtons />
        </section>
      </div>
    </Providers>
  );
}

export default App
