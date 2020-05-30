import SupportVM from "../model/train_svm";
import Train from "./interface_train";
class SVMTrain extends Train{
    algorithm=null;
    constructor(dataSVM) {
        super();
        this.algorithm=new SupportVM(dataSVM);
    }
    train =()=> {
        this.algorithm.trainSvm();
        if(this.algorithm.confermaPredizioneSVM())
            alert("Addestramento avvenuto correttamente.")
        else
            alert("Addestramento non riuscito.")
    }
    getCoefficients =()=> {
       return  this.algorithm.Weights();
    }
    getJSON =()=> {
        return this.algorithm.JSONData();
    }
}
export default SVMTrain;