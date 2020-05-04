import React, {Component} from "react";

import SVM from "../algoritmi/trainSVM";
import Reg from "../algoritmi/trainReg";

class Select_Prediction extends Component{

    getJSON(){
        if(this.props.value === "svm"){
            if(this.props.hasFile===true ) {
                let file = this.props.data;
                let isSVM=false;

                if(file[0][file[0].length-1]==="label" )
                    isSVM=true;
                else {
                    alert("File CSV incompatibile.")
                    this.props.errorAlg("");
                }

                if(isSVM===true)
                    return <SVM dataSVM={file}/>
            } else {
                alert("Inserisci il file.");
                this.props.errorAlg("");
            }
        } else if(this.props.value === "rl"){
            if(this.props.hasFile===true ) {
                let file = this.props.data;
                let isRL=false;

                if(file[0][file[0].length-1]==="y")
                    isRL=true;
                else {
                    alert("File CSV incompatibile.")
                    this.props.errorAlg("");
                }

                if(isRL===true)
                    return <Reg dataRl={file}/>
            } else {
                alert("Inserisci il file.");
                this.props.errorAlg("");
            }
        }
    }

    render() {
        return(
            <div>
                {this.getJSON()}
            </div>
        );
    }
}

export default Select_Prediction;