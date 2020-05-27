import RLTrain from "./RLTrain"
import SVMTrain from "./SVMTrain"
class Control {
    value;
    file;
    hasFile;
    json;
    strategy;

    constructor() {
        this.value = null;
        this.file = null;
        this.hasFile = null;
        this.json=null;
        this.strategy=null;
    }
    setData =(value,data,hasFile)=> {
        this.value = value;
        this.file = data;
        this.hasFile = hasFile;
    }

    isSVM =()=>{
        if (this.file[0][this.file[0].length - 1] === "label")
            return true;
        return false;
    }

    isRL =()=> {
        if (this.file[0][this.file[0].length - 1] === "y")
            return true;
        return false;
    }

    controlTrainAlgorithm =()=> {

        if (this.hasFile === true) {
            if (this.value === "svm") {   //SVM
                    if (this.isSVM() === true){
                        this.strategy=new SVMTrain(this.file);
                        this.strategy.train();
                        return true;
                    }
                    else {
                        alert("File CSV incompatibile.")
                        return false;
                    }
            } else if (this.value === "rl") { //RL
                    if (this.isRL() === true) {
                        this.strategy= new RLTrain(this.file);
                        this.strategy.train();
                        return true;
                    }
                    else {
                        alert("File CSV incompatibile.")
                        return false;
                    }
            }
            else if(this.value===""){
                    alert("Algoritmo non selezionato.")
                    return false;
            }
        } else {
            alert("File non inserito.")
            return false;
        }
    }
    controlJSON =()=> {
        if(this.value!=="")
            return this.strategy.getJSON();
    }
}

export default Control;