import React, {Component} from "react";

import SVM from "../algoritmi/provaSVM";
import Reg from "../algoritmi/provaReg";

class Select_Prediction extends Component{
    state = {
        value: "",
    }

    change(event){
        this.setState({value: event.target.value});
    }

    getJSON(){
        if(this.state.value === "svm")
            return (<SVM />);
        else  if(this.state.value === "rl")
            return (<Reg />)
        else
            return;
    }

    render() {
        return(
            <div>
                <select id="algo" className="btn btn-dark" onChange={this.change.bind(this)} value={this.state.value}>
                    <option>Seleziona l'algoritmo:</option>
                    <option value="svm">Support Vector Machine</option>
                    <option value="rl">Regressione Lineare</option>
                </select>
                <p>{this.getJSON()}</p>
            </div>
        );
    }
}

export default Select_Prediction;