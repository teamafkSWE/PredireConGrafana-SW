
import Regression from "./library/regression";

class SupportRl {
    dataRl;
    reg;
    numOfX;
    coefficients;
    constructor(dataRl) {
        this.dataRl=dataRl;
        this.reg= new Regression({ numX: dataRl[0].length, numY: 1 });
        this.numOfX=dataRl[0].length-1;
        this.coefficients=null;
    }

    getColumnsName =()=> {
        let y = this.dataRl[0][this.dataRl[0].length-1];
        let x = [];
        for(let i=0; i<this.dataRl[0].length-1; i++)
            x[i] = this.dataRl[0][i];//[this.props.dataRl[0]][[this.props.dataRl[0][i]]];
        //for(let i=0; i<x.length-1;i++)
        //  x[i] = this.props.dataRl[0];
        return {y:y,a: x, b: "angularCoefficient"};
    }
    insert =()=> {
        let data =[];
     let dataY = [];
        if(this.dataRl[0].length>2)
        {
            for (let i = 0; i < this.dataRl.length-1; i++) {
                data = [];
                dataY=[];
                data.push(1);
                for (let j = 0; j < this.dataRl[i].length - 1; j++)
                    data.push(this.dataRl[i+1][j]);
                dataY.push(this.dataRl[i+1][this.dataRl[i+1].length-1])
                this.reg.push({ x: data, y: dataY });
            }
        } else {
            for (let i = 0; i < this.dataRl.length-1; i++) {
                data = [];
                dataY=[];
                data.push(1);
                data.push(this.dataRl[i+1][0]);
                dataY.push(this.dataRl[i+1][this.dataRl[i+1].length-1])
                this.reg.push({ x: data, y: dataY });
            }
        }
     }
     getDate =()=> {
        let today = new Date();
        if(today.getMonth() < 10 && today.getDate() < 10)
            today = today.getFullYear() + "/" + "0" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        else if(today.getMonth() < 10)
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + today.getDate();
        else
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        return today;
     }

     print_retta =()=> {
        let y = "y = ";
        let a = [];
        let b = " + b";
        for(let i=0; i<this.numOfX; i++)
            a[i] = "a" + [i+1] + "x";
        return y+a+b;
     }

     trainRl =()=> {
         this.coefficients = this.reg.calculateCoefficients();
         if(this.coefficients)
             return  true;
         else
             return false;
     }
     getCoefficientsRl =()=> {
        return this.coefficients;
     }
     JSONData =()=> {
         if(this.coefficients !== null) {
             const myData = {
                 author: 'TeamAFK',
                 version: '1.0.0',
                 algorithm: 'Linear Regression',
                 date: this.getDate(),
                 predictors: this.getColumnsName(),//this.predictor(),
                 result: this.coefficients,
                 line: this.print_retta()
             }; // I am assuming that "this.state.myData"
             let data = JSON.stringify(myData,null, 1);
             return data;
         } else
             return false
     }
    dynamicColors = ()=> {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

     getDataChartRl =()=> {
        let dataSetsRl=[];
             for (let i = 0; i < this.dataRl[0].length - 1; i++) {
                 let setData = {
                     label: this.dataRl[0][i], // Name the series
                     data: [], // Specify the data values array
                     backgroundColor: this.dynamicColors(), // Add custom color background (Points and Fill)
                 };
                 for (let j = 1; j < this.dataRl.length; j++) {

                     setData.data.push({x: this.dataRl[j][i], y: this.dataRl[j][this.dataRl[0].length - 1]});

                 }
                 dataSetsRl.push(setData);
             }

         return {data:dataSetsRl,legend:true};
     }
}
export default SupportRl;