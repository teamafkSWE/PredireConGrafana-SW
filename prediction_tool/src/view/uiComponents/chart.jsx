import React, {Component} from "react";
import {Scatter} from "react-chartjs-2";

class Chart extends Component{

    state={
        options : {
            datasets: []

        }
    }
    dynamicColors = ()=> {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    formatData=()=>{

        if (this.props.hasFile!==false) {
           
            this.state.options.datasets=[];
            let propData = this.props.data;
                for (let i = 0; i < propData[0].length - 1; i++) {
                    let setData={
                        label: propData[0][i], // Name the series
                        data: [], // Specify the data values array

                        backgroundColor: this.dynamicColors(), // Add custom color background (Points and Fill)
                    };
                    for (let j = 1; j < propData.length ; j++){

                        setData.data.push({x: propData[j][i], y: propData[j][propData[0].length-1]});
                    }
                    this.state.options.datasets.push(setData);
                }
        }
    }
    render() {
        this.formatData();
        return(
            <Scatter data={this.state.options}/>
        );
    }
}

export default Chart;