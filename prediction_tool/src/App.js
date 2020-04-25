import React from 'react';
//import './App.css';
import Reg from "./algoritmi/provaReg";
import SVM from "./algoritmi/provaSVM";
import Header from "./components/header";
import States from "./components/state_controller";

function App() {
  return (
    <div className="mt-4 mb-4 text-center" >
        <Header/>
        <States/>
      <Reg/>
      <SVM />
    </div>
  );
}

export default App;
