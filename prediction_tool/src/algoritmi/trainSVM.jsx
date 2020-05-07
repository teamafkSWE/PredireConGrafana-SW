import React,{Component} from "react";
let svmjs = require ("./svm");
let svm = new svmjs.SVM();

//Simple implementation of Support Vector Machine algorithm for binary classification in javascript.

class SupportVM extends Component{

    getColumnsName() {
        let label = this.props.dataSVM[0][this.props.dataSVM[0].length-1];
        let x = new Array();

        for(let i=0; i<this.props.dataSVM[0].length-1; i++)
            x[i] = this.props.dataSVM[0][i];//[this.props.dataRl[0]][[this.props.dataRl[0][i]]];
        //for(let i=0; i<x.length-1;i++)
        //  x[i] = this.props.dataRl[0];
        return {w: x, b: label};
    }

    getDate(){
        let today = new Date();
        if(today.getMonth() < 10 && today.getDate() < 10)
            today = today.getFullYear() + "/" + "0" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        else if(today.getMonth() < 10)
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + today.getDate();
        else
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        return today;
    }

    trainSvm = () => {
        let dataSVM=this.props.dataSVM;

        let data = [dataSVM.length-1];
        for(let i=0; i<dataSVM.length-1; i++) {
            data[i] = new Array(dataSVM[0].length-1);
        }

        let labels = [dataSVM.length-1];
        for(let i=0;i<data.length;i++){
            for (let j=0;j<data[i].length;j++) {
                data[i][j] = dataSVM[i+1][j];
            }
            labels[i]=dataSVM[i+1][dataSVM[i+1].length-1];
        }

        svm.train(data, labels, {C: 3, numpasses: 100}); // C is a parameter to SVM

        return svm.getWeights();
    }

    confermaPredizioneSVM = () => {
        let result = this.trainSvm();
        if(result) {
            alert("Addestramento avvenuto correttamente.")
            this.confermaPredizioneSVM = true;
            //console.log(result);
        } else
            alert("Addestramento non riuscito.")
    }

    downloadFile =  () => {
        if(this.confermaPredizioneSVM === true) {
            const myData = {
                author: 'TeamAFK',
                version: '1.0.0',
                algorithm: 'SVM',
                date: this.getDate(),
                predictors: this.getColumnsName(),//this.predictor(),
                result: this.trainSvm()
            };
            let data = JSON.stringify(myData, null, 1);

            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
            element.setAttribute('download', 'predictorsSVM.json');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }else {
            alert("Dati non addestrati. Confermare per eseguire l'addestramento.")
        }
    }

    render() {

        return(
            <div className="mt-4 mb-2">
                <button onClick={this.confermaPredizioneSVM} className="btn btn-dark">Conferma</button>
                <p></p>
                <p>Scarica il file JSON della SVM</p>
                <button onClick={this.downloadFile} className="btn btn-dark">Download</button>
            </div>);
    }
}

export default SupportVM;