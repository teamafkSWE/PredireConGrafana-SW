import Reg from "../model/trainReg";
class RLTrain{
    reg;
    constructor(dataRl) {
        this.reg=new Reg(dataRl);
    }
    trainRl=()=>{
        this.reg.insert();

        if(this.reg.train()){
            alert("Addestramento avvenuto correttamente.")
        }
        else {
            alert("Addestramento non riuscito.")
        }
    }
    getJSONRl=()=>{
        return this.reg.JSONData();
    }
}

export default RLTrain;