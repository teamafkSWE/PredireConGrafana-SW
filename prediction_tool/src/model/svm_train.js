import SupportSvm from "./train/support_svm"
import Train from "./abstractTrain";
class SVMTrain extends Train{
    #algorithm=null;
    constructor(dataSVM) {
        super();

        this.#algorithm=new SupportSvm(dataSVM);
    }
    train =()=> {
        this.#algorithm.trainSvm();
        if(this.#algorithm.confermaPredizioneSvm()) {
            alert("Addestramento avvenuto correttamente.");
            return true;
        }
        else{
            alert("Addestramento non riuscito.")
            return false;
        }
    }
    getCoefficients =()=> {
       return  this.#algorithm.Weights();
    }
    getJSON =()=> {
        return this.#algorithm.JSONData();
    }


}
export default SVMTrain;