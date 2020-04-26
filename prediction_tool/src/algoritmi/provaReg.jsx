import React,{Component} from "react";
import Regression from "./regression";


class Reg extends Component{
    state={
       reg: new Regression({ numX: 2, numY: 1 })
    };

    insert(){
        this.state.reg.push({ x: [1,1], y: [2] });
        this.state.reg.push({ x: [1,2], y: [5] });
        this.state.reg.push({ x: [1,3], y: [6] });
        this.state.reg.push({ x: [1,4], y: [7] });
        this.state.reg.push({ x: [1,5], y: [10] });
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