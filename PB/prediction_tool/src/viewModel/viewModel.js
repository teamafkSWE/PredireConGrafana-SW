
import SVMTrain from "../model/svm_train";
import RLTrain from "../model/rl_train";
class ViewModel {
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
        this.strategy=null;
        this.checkAlgorithm();
    }
    setStrategy =()=>{
        if(this.algorithm==="svm" && this.isSVM()){
            this.strategy=new SVMTrain(this.file);
            return true;
        }
        else if(this.algorithm==="rl" && this.isRL()){
            this.strategy=new RLTrain(this.file);
            return true;
        }
        else
            return false;
    }
    checkAlgorithm =()=> {
        if(this.hasFile===true){
            if(this.algorithm!=="") {
                if (this.setStrategy() === false)
                    alert("File CSV incompatibile.");
            }
            else
                alert("Algoritmo non selezionato");

        }
        else
            alert("File non inserito.");

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
        if(this.strategy!==null)
            return this.strategy.train();
        else
            return false;
    }
    getJsonContent =()=> {
      if(this.strategy!==null)
        return this.strategy.getJSON();
    }

    getChartData =()=> {
        if(this.strategy!==null)
            return this.strategy.getDataChart();
        else
            return null;
    }

}

export default ViewModel;