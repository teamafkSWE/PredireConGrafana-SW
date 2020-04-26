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
        data: []
    }

    handleForce = data => {
        this.setState({data: data});
    };

    render() {
        return (
            <React.Fragment>
                <CSVReader
                    className="btn btn-dark"
                    label="Select CSV file to import"
                    onFileLoaded={this.handleForce}
                />
                <Select_Prediction data={this.state.data}/>
            </React.Fragment>
        );
    }
}

export default State_controller;