import React, {Component} from 'react';
import Select_Prediction from "./chooseAlgorithm";
import CSVReader from "react-csv-reader";

/*
 * Questo componente si occupa di dirigere il flow delle sue sottocomponenti
 * attivando e disattivando le componenti che sono necessarie
 *
 * Al momento input_component scrive su files l'array di file che l'utente ha dato in input, e ne legge il nome selezionato
 */
class State_controller extends Component {
    state = {
        data: [],
        name: null,
        hasFile: false,
        value: ""
    }
    changeValue(event){
        this.setState({value: event.target.value});
    }
    errorAlg=(value)=>{
        this.setState({value:value});
    }
    handleForce = (data, fileInfo) => {

        this.setState({data:data, name: fileInfo.name, hasFile:true,value:''});
    };

    render() {
        return (
            <React.Fragment>
                <label className="btn btn-dark" htmlFor="1">Selezionare il file:</label>
                <CSVReader
                    accept={".csv"}
                    inputId="1"
                    cssClass="d-none"
                    onFileLoaded={this.handleForce}
                />
                <p>{this.state.name}</p>
                <select id="algo" className="btn btn-dark" onChange={this.changeValue.bind(this)} value={this.state.value}>
                    <option>Seleziona l'algoritmo:</option>
                    <option value="svm">Support Vector Machine</option>
                    <option value="rl">Regressione Lineare</option>
                </select>

                <Select_Prediction data={this.state.data} hasFile={this.state.hasFile} value={this.state.value} errorAlg={this.errorAlg}/>
            </React.Fragment>
        );
    }
}

export default State_controller;