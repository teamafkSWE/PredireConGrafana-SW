import RLTrain from "./RLTrain"
class Control{
    value;
    file;
    hasFile;
    json;
    RlT;
    constructor() {
        this.value = null;
        this.file = null;
        this.hasFile = null;
        this.json=null;

    }
    setData=(value,data,hasFile)=>{
        this.value = value;
        this.file = data;
        this.hasFile = hasFile;
        if(this.hasFile)
            this.RlT= new RLTrain(this.file);
    }

    isSVM=()=>{
        if (this.file[0][this.file[0].length - 1] === "label")
            return true;
        return false;
    }

    isRL=()=> {
        if (this.file[0][this.file[0].length - 1] === "y")
            return true;
        return false;
    }
    getCoefficients=()=>{
        if(this.value==="rl"){
            return this.RlT.getCoefficientsRL();
        }
        if(this.value==="svm"){
            return 0;
        }
    }
    trainAlgorithm=()=> {

        if (this.hasFile === true) {

            if (this.value === "svm") {   //SVM
                if (this.isSVM() === true){
                    //return <SVM dataSVM={file}/>
                }
                else {
                    alert("File CSV incompatibile.")
                    return false;
                }
            } else if (this.value === "rl") { //RL
                if (this.isRL() === true) {

                    this.RlT.trainRl();
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
    getJSON=()=>{
        if(this.value==="rl"){
            return this.RlT.getJSONRl();
        }
        if(this.value==="svm"){

        }
    }
}

export default Control;