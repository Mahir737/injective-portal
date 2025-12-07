import { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import MobileApp from './components/MobileApp';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showIntro ? <IntroAnimation /> : <MobileApp />}
    </div>
  );
}

export default App;
