import React, {Component} from "react";
import {Scatter} from "react-chartjs-2";

class Chart extends Component{

    state={
        data : {

            datasets: [],

        },
        options:{
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        padding: 10,
                        fontColor:"white"
                    },
                    gridLines: {
                        zeroLineColor:"white"
                    }

                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        padding: 10,
                        fontColor:"white"
                    },
                    gridLines: {

                        zeroLineColor:"white"
                    }
                }]
            }
        },

    }
    dynamicColors = ()=> {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    RLChart=(propData)=>{

        for (let i = 0; i < propData[0].length - 1; i++) {
            let setData = {
                label: propData[0][i], // Name the series
                data: [], // Specify the data values array
                backgroundColor: this.dynamicColors(), // Add custom color background (Points and Fill)
            };
            for (let j = 1; j < propData.length; j++) {

                setData.data.push({x: propData[j][i], y: propData[j][propData[0].length - 1]});

            }
            this.state.data.datasets.push(setData);
        }
        this.state.options.legend.display = true;
    }
    SVMChart=(propData)=>{
        if(propData[0].length===2)
        {
            let setData = {
                label: propData[0][0], // Name the series
                data: [], // Specify the data values array
                backgroundColor: [],


            }
            for (let j = 1; j < propData.length; j++) {
                if(propData[j][propData[0].length - 1]==="1")
                    setData.backgroundColor.push("green");
                else
                    setData.backgroundColor.push("red");

                setData.data.push({x: propData[j][0], y: 0});
            }
            this.state.data.datasets.push(setData);
            this.state.options.legend.display = false;
        }
        else {
            for (let i = 0; i < propData[0].length - 2; i++) {
                let setData = {
                    label: propData[0][0], // Name the series
                    data: [], // Specify the data values array
                    backgroundColor: [],
                }

                for (let j = 1; j < propData.length; j++) {

                    if (propData[j][propData[0].length - 1] === "1")
                        setData.backgroundColor.push("green");
                    else
                        setData.backgroundColor.push("red");
                    setData.data.push({x: propData[j][i], y: propData[j][propData[0].length - 2]});
                }
                this.state.data.datasets.push(setData);
            }
            this.state.options.legend.display = false;
        }
    }
    formatData=()=> {
        if (this.props.json !== null) {
            this.state.data.datasets = [];
            let propData = this.props.data;
            if (propData[0][propData[0].length - 1] !== "label")
                this.RLChart(propData);
            else if (propData[0][propData[0].length - 1] === "label")
                this.SVMChart(propData);
        }
        else
            this.state.data.datasets = [];
    }
    render() {
        this.formatData();
        return(
            <Scatter data={this.state.data} options={this.state.options}/>
        );
    }
}

export default Chart;