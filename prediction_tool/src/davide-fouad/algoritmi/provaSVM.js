import React,{Component} from "react";

//Simple implementation of Support Vector Machine algorithm for binary classification in javascript.
let SVM = require ("./svm");


class Svm extends Component{

    state = {
        options: {
            C: 0.01,
            tol: 10e-4,
            maxPasses: 10,
            maxIterations: 10000,
            kernel: 'rbf',
            kernelOptions: {
                sigma: 0.5
            }
        }
    };
    insert(){
        this.svm = new SVM(this.state.options);
        // Train the classifier - we give him an and
        this.features = [[0,0],[0,1],[1,1],[1,0]];
        this.labels = [0, 1, 0, 1];

        this.svm.train(this.features, this.labels);
        this.point = [0,1];

        // Let's see if it is separable by testing on the training data
        //this.svm.predict(this.features); // [-1, 1, -1, 1] ok funziona
    }

    downloadFile =  () => {
        //const myData =  this.svm.predict(this.point);
        const myData =  this.svm.toJSON(this.svm.predict(this.features));
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
        this.insert();
        return(
            <div>
                <p></p>
                <p>Scarica il file JSON della SVM</p>
                <p></p>
                <button onClick={this.downloadFile} className="btn btn-dark">Download File JSON</button>
            </div>);
    }
}

export default Svm;