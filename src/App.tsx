import { Providers } from './Providers';
import { ThemeToggleButton } from './Components/ThemeToggleButton';

function App() {
  return (
    <Providers>
      <div className="mockup-browser border border-base-300 w-full">
        <div className="mockup-browser-toolbar">
          <ThemeToggleButton />
        </div>
      </div>
    </Providers>
  );
}

export default App
