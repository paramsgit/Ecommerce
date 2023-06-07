import './App.css';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import WebFont from "webfontloader";
import { useEffect } from "react";

function App() {

  useEffect(() => {
  WebFont.load({
    google: {
      families: ["Roboto", "Droid Sans", "Chilanka"],
    }, 
  });

  
}, []);
  return (
    <Router>
    <Header/>
    <Home/>
    <Routes>
    <Route exact path="/" component={Home}/>
    </Routes>
    <Footer/>
    </Router>

  );
}

export default App;
