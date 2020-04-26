import React,{Component} from "react";
let svmjs = require ("./svm");
let svm = new svmjs.SVM();

//Simple implementation of Support Vector Machine algorithm for binary classification in javascript.

class SupportVM extends Component{
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

    downloadFile =  () => {
        const myData =  this.trainSvm();
        let data = JSON.stringify(myData,null, 1);

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', 'dati.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    render() {

        return(
            <div className="mt-4 mb-2">
                <p>Scarica il file JSON della SVM</p>
                <button onClick={this.downloadFile} className="btn btn-dark">Download</button>
            </div>);
    }
}

export default SupportVM;