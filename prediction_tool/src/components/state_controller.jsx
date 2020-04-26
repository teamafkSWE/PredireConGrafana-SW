import React, {Component} from 'react';
import Select_Prediction from "./chooseAlgorithm";

/*
 * Questo componente si occupa di dirigere il flow delle sue sottocomponenti
 * attivando e disattivando le componenti che sono necessarie
 *
 * Al momento input_component scrive su files l'array di file che l'utente ha dato in input, e ne legge il nome selezionato
 */
class State_controller extends Component {

    state = {
        hasFile: false,
        file: null
    }

    papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }
    render() {
        return (
            <React.Fragment>
                <Select_Prediction file={this.dataFile()}/>
            </React.Fragment>
        );
    }
    dataFile = () => {
        return this.state.file;
    }

    handleFileInput = files => {
        this.setState({file: files[0], hasFile:true});

    }

    getFileName = () =>{
        if (this.state.file == null)
            return "";
        else
            return this.state.file.name;
    }
}

export default State_controller;