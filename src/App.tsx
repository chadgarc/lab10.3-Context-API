import { Providers } from './Providers';
import { ThemeToggleButton } from './Components/ThemeToggleButton';
import { FilterButtons } from './Components/FilterButtons';

function App() {
  return (
    <Providers>
      <div className="mockup-browser w-full">
        <div className="mockup-browser-toolbar flex justify-between">
          <h4 className='font-bold'>To Do App</h4>
          <ThemeToggleButton />
        </div>
        <section className='w-full'>
          <FilterButtons />
        </section>
      </div>
    </Providers>
  );
}

export default App
