
import SVMTrain from "../model/svm_train";
import RLTrain from "../model/rl_train";
class ViewModel {
    #algorithm;
    #file;
    #hasFile;
    #strategy;
    #xAxis;
    #indexOfMax;
    #indexOfMin;
    #maxXAxis;
    #minXAxis;
    constructor() {
        this.#algorithm = null;
        this.#file = null;
        this.#hasFile = null;
        this.#strategy=null;
        this.#xAxis=null;
        this.#indexOfMax=null;
        this.#indexOfMin=null;
        this.#maxXAxis=null;
        this.#minXAxis=null;
    }
    setXAxis=(xAxis)=>{
        this.#xAxis=xAxis;
    }
    setFileData=(data,hasFile)=>{
        this.#file = data;
        this.#hasFile = hasFile;
        this.#xAxis=data[0][0];
    }
    setAlgorithm =(algorithm)=> {
        this.#algorithm = algorithm;
        this.#strategy=null;
        this.checkAlgorithm();
    }
    setStrategy =()=>{
        if(this.#algorithm==="svm" && this.isSVM()){
            this.#strategy=new SVMTrain(this.#file);
            return true;
        }
        else if(this.#algorithm==="rl" && this.isRL()){
            this.#strategy=new RLTrain(this.#file);
            return true;
        }
        else
            return false;
    }
    checkAlgorithm =()=> {
        if(this.#hasFile===true){
            if(this.#algorithm!=="") {
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
        if (this.#file[0][this.#file[0].length - 1] === "label"){

            let checkLabel=false;
            for(let i=1;i<this.#file.length;i++){
                if(this.#file[i][this.#file[0].length - 1]==="1" || this.#file[i][this.#file[0].length - 1]==="-1")
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
        if(this.#strategy!==null)
            return this.#strategy.train();
        else
            return false;
    }
    getJsonContent =()=> {
      if(this.#strategy!==null)
        return this.#strategy.getJSON();
    }
    getPredictorsName =()=> {
                let name = [];
                for(let i=0; i<this.#file[0].length-1; i++)
                    name[i] = this.#file[0][i];
                return  name;
    }
    ChartAxisX=(label,dataX,dataY)=>{
        let setData=null;
        if(this.isSVM())
        {
            setData = {
                label: label, // Name the series
                data: [], // Specify the data values array
                backgroundColor: [],
                pointHoverRadius: 7,
                pointHitRadius: 5,
                pointStyle: 'rectRounded'

            }

            for (let i = 0; i < dataX.length; i++) {
                if (this.#file[i+1][this.#file[0].length - 1] === "1")
                    setData.backgroundColor.push("green");
                else
                    setData.backgroundColor.push("red");
                setData.data.push({x:dataX[i], y: dataY[i]});
            }
            return setData;
        }
        else
        {
            setData= {
                label: label, // Name the series
                data: [], // Specify the data values array
                backgroundColor: "rgb(204,255,0)",// Add custom color background (Points and Fill)
                pointHoverRadius:7,
                pointHitRadius:5,
                pointStyle:'rectRounded'
            };
            for (let i = 0; i < dataX.length; i++) {
                setData.data.push({x:dataX[i], y: dataY[i]});
            }
            return setData;
        }

    }
    straightLine=()=>{
        if(this.#strategy!==null){
            let coefficients=this.#strategy.getCoefficients();
            let FmaxPoint=0;
            let FminPoint=0;
            if(this.isSVM()){
                if(this.#file[0].length===2){
                 /*console.log("maxSinglepoint "+(-(coefficients.w[0]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMax][0]));
                    console.log("minSinglepoint "+(-(coefficients.w[0]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMin][0]));
                 */
                    FmaxPoint=FmaxPoint-((coefficients.w[0]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMax][0]);
                    FminPoint=FminPoint-((coefficients.w[0]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMin][0]);
                    FmaxPoint=FmaxPoint-(coefficients.b/coefficients.w[coefficients.w.length-1]);
                    FminPoint=FminPoint-(coefficients.b/coefficients.w[coefficients.w.length-1]);
                }
                else{
                    for(let i = 0; i < this.#file[0].length - 2; i++){
                     /* console.log("max"+this.#file[this.#indexOfMax][i]);
                        console.log("min"+this.#file[this.#indexOfMin][i]);
                        console.log("maxSinglepoint "+(-(coefficients.w[i]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMax][i]));
                        console.log("minSinglepoint "+(-(coefficients.w[i]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMin][i]));
                    */
                        FmaxPoint=FmaxPoint-((coefficients.w[i]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMax][i]);
                        FminPoint=FminPoint-((coefficients.w[i]/coefficients.w[coefficients.w.length-1])*this.#file[this.#indexOfMin][i]);
                    }
                    /*   console.log("maxSinglepointB "+(-(coefficients.b/coefficients.w[coefficients.w.length-1])));
                       console.log("fmax"+FmaxPoint);
                       console.log("fmin"+FminPoint);*/

                    FmaxPoint=FmaxPoint-(coefficients.b/coefficients.w[coefficients.w.length-1]);
                    FminPoint=FminPoint-(coefficients.b/coefficients.w[coefficients.w.length-1]);
                }

            }
            else
            {
                for(let i = 0; i < this.#file[0].length - 1; i++){
                    FmaxPoint=FmaxPoint+this.#file[this.#indexOfMax][i]*coefficients.a[i];
                    FminPoint=FminPoint+this.#file[this.#indexOfMin][i]*coefficients.a[i];
                }
                FmaxPoint=FmaxPoint+coefficients.b;
                FminPoint=FminPoint+coefficients.b;
            }

          /*  console.log("w"+coefficients.w);
            console.log("w-1"+coefficients.w[coefficients.w.length-1]);
            console.log("b"+coefficients.b);
            console.log("FmaxPoint"+FmaxPoint);
            console.log("FminPoint"+FminPoint);*/

            return( {
                type: 'line',
                fill:false,
                label: 'Regression', // Name the series
                borderDash:[5],
                data: [{x:this.#maxXAxis,y:FmaxPoint},
                    {x:this.#minXAxis,y:FminPoint}], // Specify the data values array
                borderColor:"rgb(255,43,0)",
                pointRadius:0
            })
        }
    }

    Chart=()=>{
        let dataSetsRl=[];
        for (let i = 0; i < this.#file[0].length - 1; i++) {
            if(this.#file[0][i]===this.#xAxis){
                let dataX=[];
                let dataY=[];
                let yNameAxis="";
                this.#maxXAxis=Number.NEGATIVE_INFINITY;
                this.#minXAxis=Number.POSITIVE_INFINITY;
                this.#indexOfMax=0;
                this.#indexOfMin=0;
                for (let j = 1; j < this.#file.length; j++) {
                    let tempMax=this.#maxXAxis;
                    let tempMin=this.#minXAxis;
                    this.#maxXAxis= Math.max(this.#file[j][i], this.#maxXAxis);
                    this.#minXAxis= Math.min(this.#file[j][i], this.#minXAxis);
                    if(this.#maxXAxis!==tempMax){
                        this.#indexOfMax=j;
                    }
                    if(this.#minXAxis!==tempMin){
                        this.#indexOfMin=j;
                    }
                    dataX.push(this.#file[j][i]);
                    if(this.isSVM()){
                        if(this.#file[0].length===2){
                            yNameAxis="Y not present";
                            dataY.push(0);
                        }
                        else{
                            yNameAxis=this.#file[0][this.#file[0].length - 2];
                            dataY.push( this.#file[j][this.#file[0].length - 2]);
                        }
                    }
                    else{
                        yNameAxis=this.#file[0][this.#file[0].length - 1];
                        dataY.push( this.#file[j][this.#file[0].length - 1]);
                    }
                }
                dataSetsRl.push(this.ChartAxisX(this.#xAxis,dataX,dataY));
                return {data:dataSetsRl,yAxis:yNameAxis,xAxis:this.#xAxis};
            }
        }
    }
/*
    SVMChart=()=>{
        let dataSetsSvm=[];
        if(this.#file[0].length===2)
        {
            let setData = {
                label: this.#file[0][0], // Name the series
                data: [], // Specify the data values array
                backgroundColor: [],
                pointHoverRadius:7,
                pointHitRadius:5,
                pointStyle:'rectRounded'

            }
            for (let j = 1; j < this.#file.length; j++) {
                if(this.#file[j][this.#file[0].length - 1]==="1")
                    setData.backgroundColor.push("green");
                else
                    setData.backgroundColor.push("red");

                setData.data.push({x: this.#file[j][0], y: 0});
            }
            dataSetsSvm.push(setData);
        }
        else {
            for (let i = 0; i < this.#file[0].length - 1; i++) {
                console.log(this.#xAxis);
                console.log(this.#file[0][i]);

                if(this.#file[0][i]===this.#xAxis) {
                    let dataX=[];
                    let dataY=[];
                    this.#maxXAxis=Number.NEGATIVE_INFINITY;
                    this.#minXAxis=Number.POSITIVE_INFINITY;
                    this.#indexOfMax=0;
                    this.#indexOfMin=0;
                    for (let j = 1; j < this.#file.length; j++) {
                        dataX.push(this.#file[j][i]);
                        dataY.push( this.#file[j][this.#file[0].length - 2]);
                    }


                    dataSetsSvm.push(this.ChartAxisX(this.#xAxis,dataX,dataY));
                    return {data:dataSetsSvm,legend:false};

                }
            }
        }

    }*/

}

export default ViewModel;