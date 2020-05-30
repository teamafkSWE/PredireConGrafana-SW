import Reg from "../model/train_reg";
import Train from "./interface_train";
class RLTrain extends Train {
    algorithm=null;
    constructor(dataRl) {
        super();
        this.algorithm=new Reg(dataRl);
    }
    train =()=> {
        this.algorithm.insert();
        if(this.algorithm.trainRl()){
            alert("Addestramento avvenuto correttamente.");
            return true;
        }
        else{
            alert("Addestramento non riuscito.");
            return false;
        }
    }
    getCoefficients =()=> {
       return  this.algorithm.getCoefficientsRl();
    }
    getJSON =()=> {
        return this.algorithm.JSONData();
    }
}

export default RLTrain;