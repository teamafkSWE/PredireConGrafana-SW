import React,{Component} from "react";
import Regression from "./regression";


class Reg extends Component{

    state={
        dataRl:this.props.dataRl,
        data: null,
       reg: new Regression({ numX: this.props.dataRl[0].length-1, numY: 1 })
    };

    insert(){

         this.state.data =new Array( this.state.dataRl.length-1);

        if(this.state.dataRl[0].length-1===1)
        {
            console.log(this.state.data)
            for(let i=0;i<this.state.data.length;i++){
                this.state.data[i] = this.state.dataRl[i+1][0];
            }
        }
        else {
            for(let i=0; i<this.state.dataRl.length-1; i++) {
                this.state.data[i] = new Array(this.state.dataRl[0].length-1);
            }
            for(let i=0;i<this.state.data.length;i++) {
                for (let j = 0; j < this.state.data[i].length; j++) {
                    this.state.data[i][j] = this.state.dataRl[i + 1][j];
                }
            }
        }
        let dataY = new Array( this.state.dataRl.length-1);

        for (let j=0;j<dataY.length;j++) {
            dataY[j] = this.state.dataRl[j+1][this.state.dataRl[0].length-1];
        }


        for (let i=0;i<this.state.data.length;i++)
        {
            this.state.reg.push({ x: [1,this.state.data[i]], y: dataY[i] });

        }

/*
        this.state.reg.push({ x: [1,2], y: [5] });
        this.state.reg.push({ x: [1,3], y: [6] });
        this.state.reg.push({ x: [1,4], y: [7] });
        this.state.reg.push({ x: [1,5], y: [10] });*/
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