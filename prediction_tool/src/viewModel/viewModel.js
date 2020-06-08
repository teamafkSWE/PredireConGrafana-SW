
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
    setFileData=(data,hasFile)=>{
        this.file = data;
        this.hasFile = hasFile;
    }
    setAlgorithm =(algorithm)=> {
        this.algorithm = algorithm;
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

    dynamicColors = ()=> {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    RLChart=()=>{
        let dataSetsRl=[];
        for (let i = 0; i < this.file[0].length - 1; i++) {
            let setData = {
                label: this.file[0][i], // Name the series
                data: [], // Specify the data values array
                backgroundColor: this.dynamicColors(), // Add custom color background (Points and Fill)
            };
            for (let j = 1; j < this.file.length; j++) {

                setData.data.push({x: this.file[j][i], y: this.file[j][this.file[0].length - 1]});

            }
            dataSetsRl.push(setData);
        }

        return {data:dataSetsRl,legend:true};
    }

    SVMChart=()=>{
        let dataSetsSvm=[];
        if(this.file[0].length===2)
        {
            let setData = {
                label: this.file[0][0], // Name the series
                data: [], // Specify the data values array
                backgroundColor: [],
            }
            for (let j = 1; j < this.file.length; j++) {
                if(this.file[j][this.file[0].length - 1]==="1")
                    setData.backgroundColor.push("green");
                else
                    setData.backgroundColor.push("red");

                setData.data.push({x: this.file[j][0], y: 0});
            }
            dataSetsSvm.push(setData);
        }
        else {
            for (let i = 0; i < this.file[0].length - 2; i++) {
                let setData = {
                    label: this.file[0][i], // Name the series
                    data: [], // Specify the data values array
                    backgroundColor: [],
                }

                for (let j = 1; j < this.file.length; j++) {

                    if (this.file[j][this.file[0].length - 1] === "1")
                        setData.backgroundColor.push("green");
                    else
                        setData.backgroundColor.push("red");
                    setData.data.push({x: this.file[j][i], y: this.file[j][this.file[0].length - 2]});
                }

                dataSetsSvm.push(setData);
            }
        }
        return {data:dataSetsSvm,legend:false};
    }

}

export default ViewModel;