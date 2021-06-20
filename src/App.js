import './App.sass';

import { useState, createContext } from "react";

import Header from "./components/Header";
import Router from "./components/Router";
import Footer from "./components/Footer";

export const GlobalContext = createContext({});

function App() {

  const [coldColors, setColdColors] = useState(false);
  const [volume, setVolume] = useState(1);
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  return (

    <div className={"App " + (coldColors ? "colorblind" : "")}>
      <GlobalContext.Provider value={{ volume, setVolume, authenticatedUser, setAuthenticatedUser }}>
        <Header coldColors={coldColors} setColdColors={setColdColors} volume={volume} setVolume={setVolume}
          authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />
        <div id="main-content">
          <Router />
        </div>
        <Footer />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
