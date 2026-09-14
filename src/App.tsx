import { Providers } from './Providers';
import { ThemeToggleButton } from './Components/ThemeToggleButton';
import { FilterButtons } from './Components/FilterButtons';
import { TodoInput } from './Components/TodoInput';
import { TodoList } from './Components/TodoList';


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
