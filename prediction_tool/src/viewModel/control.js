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
        this.RlT= new RLTrain();
    }
    setData=(value,data,hasFile)=>{
        this.value = value;
        this.file = data;
        this.hasFile = hasFile;
        console.log(this.value);
        console.log(this.file);
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

    trainAlgorithm=()=> {
        console.log(this.file);
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
                    //return <Reg dataRl={file}/>
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
}

export default Control;