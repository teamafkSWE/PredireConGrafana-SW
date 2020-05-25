import SupportVM from "../model/trainSVM";
class SVMTrain{
    svm;
    constructor(dataSVM) {
        this.svm=new SupportVM(dataSVM);
    }
    trainSVM=()=>{
        this.svm.trainSvm();

        if(this.svm.confermaPredizioneSVM()){
            alert("Addestramento avvenuto correttamente.")
        }
        else {
            alert("Addestramento non riuscito.")
        }
    }
   /* getCoefficientsRL=()=>{

       return  this.reg.getCoefficients();
    }*/
    getJSONSVM=()=>{
        return this.svm.JSONData();
    }
}

export default SVMTrain;