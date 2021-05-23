import './App.sass';

import { useState } from "react";

import Header from "./components/Header";
import Router from "./components/Router";
import Footer from "./components/Footer";

function App() {

  const [coldColors, setColdColors] = useState(false);

  return (
    
    <div className={"App " + (coldColors ? "colorblind" : "")}>
    <Header coldColors={coldColors} setColdColors={setColdColors} />
    <div id="main-content">
        <Router />
    </div>
    <Footer />
    </div>
  );
}

export default App;
