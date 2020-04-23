import React from "react";
import ReactDom from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import Button from './components/button'
import Header from "./components/header";
import Buttons from "./components/buttons";




ReactDom.render(
    <React.StrictMode>
        <Header />
        <Buttons dir="horizontal">
            <Button>Carica dati di addestramento</Button>
            <Buttons dir="vertical">
                <Button>Test</Button>
                <Button>Carica dati di addestramento</Button>
                <Button>nope</Button>
            </Buttons>
            <Button>Carica dati di addestramento</Button>
        </Buttons>
    </React.StrictMode>,
    document.getElementById("root")
);