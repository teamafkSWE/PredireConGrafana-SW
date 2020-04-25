import React,{Component} from "react";

let svmjs = require ("./svm");
let svm = new svmjs.SVM();

//Simple implementation of Support Vector Machine algorithm for binary classification in javascript.

class SupportVM extends Component{
    testsvm = () => {
        // Linearly non-separable test
        var N = 10;
        var data = new Array(N);
        var labels = new Array(N);
        //X
        data[0] = [-0.4326, 1.1909];
        data[1] = [3.0, 4.0]; // this point makes data non-separable
        data[2] = [0.1253, -0.0376];
        data[3] = [0.2877, 0.3273];
        data[4] = [-1.1465, 0.1746];
        data[5] = [1.8133, 2.1139];
        data[6] = [2.7258, 3.0668];
        data[7] = [1.4117, 2.0593];
        data[8] = [4.1832, 1.9044];
        data[9] = [1.8636, 1.1677];

        // Y
        labels[0] = 1;
        labels[1] = 1;
        labels[2] = 1;
        labels[3] = 1;
        labels[4] = 1;
        labels[5] = -1;
        labels[6] = -1;
        labels[7] = -1;
        labels[8] = -1;
        labels[9] = -1;

        svm.train(data, labels, {C: 3, numpasses: 100}); // C is a parameter to SVM

        return { Weights: svm.getWeights(data), Margins: svm.margins(data), Predictions: svm.predict(data) } ;

        //return svm.margins(data);
    }

    downloadFile =  () => {
        const myData =  this.testsvm();
        var data = JSON.stringify(myData,null, 1);

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', 'dati.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    render() {
        return(
            <div>
                <p></p>
                <p>Scarica il file JSON della SVM</p>
                <p></p>
                <button onClick={this.downloadFile} className="btn btn-dark">Download File JSON</button>
            </div>);
    }
}

export default SupportVM;