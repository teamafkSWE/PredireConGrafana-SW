import React from "react";
import ReactDom from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import Header from "./components/header";
import States from "./components/state_controller";


ReactDom.render(
    <React.StrictMode>
        <div className="mt-4 mb-4 text-center" >
            <Header/>
            <States/>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);