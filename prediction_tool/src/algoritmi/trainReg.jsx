import React,{Component} from "react";
import Regression from "./regression";


class Reg extends Component{

    state={
        dataRl:this.props.dataRl,
        reg: new Regression({ numX: this.props.dataRl[0].length, numY: 1 }),
        numOfX: this.props.dataRl[0].length-1
    };

    getColumnsName() {
        let y = this.props.dataRl[0][this.props.dataRl[0].length-1];
        let x = new Array();

        for(let i=0; i<this.props.dataRl[0].length-1; i++)
            x[i] = this.props.dataRl[0][i];//[this.props.dataRl[0]][[this.props.dataRl[0][i]]];
        //for(let i=0; i<x.length-1;i++)
        //  x[i] = this.props.dataRl[0];
        return {a: x, b: y};
    }


    insert(){
     let data =[];
     let dataY = [];
        if(this.state.dataRl[0].length>2)
        {
            for (let i = 0; i < this.props.dataRl.length-1; i++) {
                data = [];
                dataY=[];
                data.push(1);

                for (let j = 0; j < this.props.dataRl[i].length - 1; j++)
                    data.push(this.props.dataRl[i+1][j]);

                dataY.push(this.props.dataRl[i+1][this.props.dataRl[i+1].length-1])
                //console.log(data)
                //console.log(dataY)
                this.state.reg.push({ x: data, y: dataY });
            }
        } else {
            for (let i = 0; i < this.props.dataRl.length-1; i++) {
                data = [];
                dataY=[];
                data.push(1);
                data.push(this.props.dataRl[i+1][0]);
                dataY.push(this.props.dataRl[i+1][this.props.dataRl[i+1].length-1])
                //console.log(data)
                //console.log(dataY)
                this.state.reg.push({ x: data, y: dataY });
            }
        }
     }

     predictor(){
        return {a: this.state.numOfX, b: 1};
     }

     getDate(){
        let today = new Date();
        if(today.getMonth() < 10 && today.getDate() < 10)
            today = today.getFullYear() + "/" + "0" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        else if(today.getMonth() < 10)
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + today.getDate();
        else
            today = today.getFullYear() + "/" + (today.getUTCMonth()+1) + "/" + "0" + today.getDate();
        return today;
     }

     print_retta(){
        let y = "y = ";
        let a = new Array();
        let b = " + b";
        for(let i=0; i<this.state.numOfX; i++)
            a[i] = "a" + [i+1] + "x";
        return y+a+b;
     }

     downloadFile =  () => {
         const myData = {
             author: 'TeamAFK',
             version: '1.0.0',
             algorithm: 'Linear Regression',
             date: this.getDate(),
             predictors: this.getColumnsName(),//this.predictor(),
             result: this.state.reg.calculateCoefficients(),
             line: this.print_retta()
         }; // I am assuming that "this.state.myData"
         let data = JSON.stringify(myData,null, 1);

         var element = document.createElement('a');
         element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
         element.setAttribute('download', 'dati.json');

         element.style.display = 'none';
         document.body.appendChild(element);

         element.click();

         document.body.removeChild(element);
    }
    render() {
        this.insert();
        return(
        <div className="mt-4 mb-2">
            <p>Scarica il file JSON della RL</p>
            <button onClick={this.downloadFile} className="btn btn-dark">Download</button>
        </div>);
    }
}

export default Reg;