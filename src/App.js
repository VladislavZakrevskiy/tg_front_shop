import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/UI/header/Header';
import Form from './pages/Form/Form';
import ProductList from './pages/ProductList/ProductList';



const tg = window.Telegram.WebApp


function App() {

    useEffect(() => {
      tg.ready()
    }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
            <Route index element={<ProductList/>}/>
            <Route path={'form'} element={<Form/>}/>
        </Routes>
    </div>
  );
}

export default App;
