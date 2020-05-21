
class Select_Prediction{
    value;
    file;
    hasFile;
    constructor() {
        this.value = null;
        this.file = null;
        this.hasFile = null;

    }
    setData=(value,data,hasFile)=>{
        this.value = value;
        this.file = data;
        this.hasFile = hasFile;
        console.log(this.value);
        console.log(this.file);
        console.log(this.hasFile);

    }
    isThereAnyFile=()=>{
        if (this.hasFile === true)
            return true;

        return false;
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

    getJSON=()=> {
        console.log(this.file);
        if (this.value) { //se il file è stato inserito
            if (this.isThereAnyFile() === true) {

                if (this.value === "svm") {   //SVM
                    if (this.isSVM() === true){
                        //return <SVM dataSVM={file}/>
                    }
                    else {
                        alert("File CSV incompatibile.")
                       // this.props.errorAlg("");
                    }
                } else if (this.value === "rl") { //RL
                    if (this.isRL() === true) {
                        //return <Reg dataRl={file}/>
                    }
                    else {
                        alert("File CSV incompatibile.")
                      //  this.props.errorAlg("");
                    }
                }
            } else {
                alert("File non inserito.")
                //this.props.errorAlg("");
            }
        }
    }
}

export default Select_Prediction;