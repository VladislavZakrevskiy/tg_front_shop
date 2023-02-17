import { useEffect } from 'react';
import './App.css'
import { useTelegram } from './hooks/useTelegram';


const tg = window.Telegram.WebApp


function App() {
  const {onToggleButton} = useTelegram()
    useEffect(() => {
      tg.ready()
    }, [])
  return (
    <div className="App">
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
