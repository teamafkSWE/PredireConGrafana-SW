import RLTrain from "./rl_train"
import SVMTrain from "./svm_train"
class Control {
    algorithm;
    file;
    hasFile;
    json;
    strategy;

    constructor() {
        this.algorithm = null;
        this.file = null;
        this.hasFile = null;
        this.json=null;
        this.strategy=null;
    }
    setData =(algorithm,data,hasFile)=> {
        this.algorithm = algorithm;
        this.file = data;
        this.hasFile = hasFile;
    }
    setStrategy =()=>{
        if(this.algorithm==="svm" && this.isSVM()){
            this.strategy=new SVMTrain(this.file);
            return true;
        }
        else if(this.algorithm==="rl" && this.isRL()){
            this.strategy= new RLTrain(this.file);
            return true;
        }
        else
            return false;
    }
    checkAlgorithm =()=> {
        if(this.hasFile===true){
            if(this.algorithm!=="")
                if(this.setStrategy())
                    return true
                else {
                    alert("File CSV incompatibile.");
                    return false;
                }
            else{
                alert("Algoritmo non selezionato");
                return false;
            }
        }
        else {
            alert("File non inserito.");
            return false;
        }
    }
    isSVM =()=>{
        if (this.file[0][this.file[0].length - 1] === "label"){
            let checkLabel=false;
            for(let i=1;i<this.file.length;i++){
                if(this.file[i][this.file[0].length - 1]==="1" || this.file[i][this.file[0].length - 1]==="-1")
                    checkLabel=true;
                else
                    return false;
            }
            return checkLabel;

        }
        return false;
    }

    isRL =()=> {
        if (!this.isSVM())
            return true;
        return false;
    }

    performTraining =()=> {
        if(this.checkAlgorithm())
            return this.strategy.train();
        else
            return false;
    }
    getJsonContent =()=> {
        return this.strategy.getJSON();
    }

}

export default Control;