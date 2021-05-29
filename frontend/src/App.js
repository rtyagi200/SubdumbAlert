import React from 'react';
import {Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

const App = () =>{
    return (
       <>
       <Route exact path="/">
          <Welcome/>
       </Route>
       <Route path="/join">
          <Login/>
       </Route>
       <Route path="/home">
          <Home/>
       </Route>
       </>
    )
}

export default App;
