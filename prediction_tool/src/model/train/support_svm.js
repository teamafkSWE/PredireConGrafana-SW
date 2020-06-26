
let svmjs = require ("./library/svm");


//Simple implementation of Support Vector Machine algorithm for binary classification in javascript.

class SupportSvm {
    #dataSVM;
    #svm
    #weights;
    constructor(dataSVM) {
        this.#dataSVM=dataSVM;
        this.#svm = new svmjs.SVM();
        this.#weights=null;
    }
    getColumnsName =()=> {
        let x = [];
        for(let i=0; i<this.#dataSVM[0].length-1; i++)
            x[i] = this.#dataSVM[0][i];//[this.props.dataRl[0]][[this.props.dataRl[0][i]]];
        //for(let i=0; i<x.length-1;i++)
        //  x[i] = this.props.dataRl[0];
        return {w: x, b:"bias"};
    }

    getDate =()=> {
        let today = new Date();
        if(today.getMonth() < 10 && today.getDate() < 10)
            today = today.getFullYear() + "/" + "0" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        else if(today.getMonth() < 10)
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + today.getDate();
        else
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        return today;
    }

    trainSvm =()=> {
        let dataSVM=this.#dataSVM;
        let data = [this.#dataSVM.length-1];
        for(let i=0; i<this.#dataSVM.length-1; i++) {
            data[i] = new Array(dataSVM[0].length-1);
        }
        let labels = [this.#dataSVM.length-1];
        for(let i=0;i<data.length;i++){
            for (let j=0;j<data[i].length;j++) {
                data[i][j] = this.#dataSVM[i+1][j];
            }
            labels[i]=this.#dataSVM[i+1][this.#dataSVM[i+1].length-1];
        }

        this.#svm.train(data, labels, {C: 3, numpasses: 100}); // C is a parameter to SVM
        this.#weights =this.#svm.getWeights();
    }
    Weights =()=> {
        return this.#weights;
    }
    confermaPredizioneSvm =()=> {
        if(this.#weights!==null)
            return  true;
        else
            return false;
    }

    JSONData =()=> {
        if(this.confermaPredizioneSvm() === true) {
            const myData = {
                author: 'TeamAFK',
                version: '1.0.0',
                algorithm: 'SVM',
                date: this.getDate(),
                predictors: this.getColumnsName(),//this.predictor(),
                result: this.#weights
            };
            let data = JSON.stringify(myData, null, 1);
            return data;
        }else {
            return false;
        }
    }


}
export default SupportSvm;