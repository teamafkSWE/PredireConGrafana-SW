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
        if(this.state.value === "svm"){
            if(this.props.hasFile===true ) {
                let file = this.props.data;
                let isSVM=false;

                if(file[0][file[0].length-1]==="label" && file[0][file[0].length-2]==="y" )
                    isSVM=true;

                if(isSVM===true)
                    return <SVM dataSVM={file}/>
            } else {
                alert("Inserisci il cazzo di file!!!!!!????");
                this.setState({value: ""});
            }
        } else if(this.state.value === "rl"){
            if(this.props.hasFile===true ) {
                let file = this.props.data;
                let isRL=false;

                if( file[0][file[0].length-1]==="y")
                    isRL=true;

                if(isRL===true)
                    return <Reg dataRl={file}/>
            } else {
                alert("Inserisci il cazzo di file!!!!!!????");
                this.setState({value: ""});
            }
        }
    }

    render() {
        return(
            <div>
                <select id="algo" className="btn btn-dark" onChange={this.change.bind(this)} value={this.state.value}>
                    <option>Seleziona l'algoritmo:</option>
                    <option value="svm">Support Vector Machine</option>
                    <option value="rl">Regressione Lineare</option>
                </select>
                <div>{this.getJSON()}</div>
            </div>
        );
    }
}

export default Select_Prediction;