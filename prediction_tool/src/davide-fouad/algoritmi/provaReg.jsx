import React,{Component} from "react";
import Regression from "./regression";
var fs=require('fs');
class Reg extends Component{
    state={
      count:0,
       reg: new Regression({ numX: 3, numY: 1 })
    };
    insert(){
        this.state.reg.push({ x: [1, 5.5], y: [4.2] });
        this.state.reg.push({ x: [1,1,1], y: [10] });
        this.state.reg.push({ x: [1,2,1], y: [9] });
        this.state.reg.push({ x: [1,1,2], y: [7] });
        this.state.reg.push({ x: [1,2,2], y: [6] });

    }
     downloadFile =  () => {
        const myData = this.state.reg.calculateCoefficients(); // I am assuming that "this.state.myData"
         var data = JSON.stringify(myData,null,2);

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
        <div>
            <button onClick={this.downloadFile}>Download Dati</button>
            <span></span>
            <span>{console.log('coefficienti '+this.state.reg.calculateCoefficients())}</span>
        </div>);
    }


}

export default Reg;