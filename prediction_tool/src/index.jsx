import React from "react";
import ReactDom from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import Header from "./components/header";
import States from "./components/state_controller"
import App from "./davide-fouad/App";


ReactDom.render(
    <React.StrictMode>
        <Header/>
        <States/>

    </React.StrictMode>,
    document.getElementById("root")
);