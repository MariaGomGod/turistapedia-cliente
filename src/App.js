import 'react-notifications/lib/notifications.css';
import './App.sass';

import { useState, createContext } from "react";

import Router from "./components/Router";
import './App.sass';

export const GlobalContext = createContext({});

function App() {

  const [coldColors, setColdColors] = useState(false);
  const [volume, setVolume] = useState(1);
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthenticatedUser({});
  };

  return (

    <div className={"App " + (coldColors ? "colorblind" : "")}>
      <GlobalContext.Provider value={{ coldColors, setColdColors, volume, setVolume, authenticatedUser, setAuthenticatedUser, logOut }}>
        <Router />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
