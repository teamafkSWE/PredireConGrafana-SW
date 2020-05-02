import React,{Component} from "react";
import Regression from "./regression";


class Reg extends Component{

    state={
        dataRl:this.props.dataRl,
       reg: new Regression({ numX: this.props.dataRl[0].length, numY: 1 })
    };

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

     downloadFile =  () => {
         const myData = this.state.reg.calculateCoefficients(); // I am assuming that "this.state.myData"
         var data = JSON.stringify(myData,null, 1);

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