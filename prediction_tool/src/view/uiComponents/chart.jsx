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
            }
        }
    }
    dynamicColors = ()=> {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    formatData=()=>{

        if (this.props.hasFile!==false && this.props.json!==null) {
            this.state.data.datasets=[];
            let propData = this.props.data;
            if(propData[0][propData[0].length - 1] === "y") {
                let coefficients=null;

                coefficients= JSON.parse(this.props.json);
                    console.log(coefficients.result.b)

                let FmaxPoint=0;
                let FminPoint=0;
                let lowest = Number.POSITIVE_INFINITY;
                let highest = Number.NEGATIVE_INFINITY;
                for (let i = 0; i < propData[0].length - 1; i++) {
                    let setData = {


                        label: propData[0][i], // Name the series
                        data: [], // Specify the data values array
                        backgroundColor: this.dynamicColors(), // Add custom color background (Points and Fill)
                    };
                    for (let j = 1; j < propData.length-1; j++) {

                        console.log(propData[j][i])
                        console.log(lowest)

                        lowest = Math.min(propData[j][i], lowest)
                        highest = Math.max(propData[j][i], highest);
                        setData.data.push({x: propData[j][i], y: propData[j][propData[0].length - 1]});

                    }

                    FmaxPoint=FmaxPoint+coefficients.result.a[i]*highest;
                    FminPoint=FminPoint+coefficients.result.a[i]*lowest;
                    console.log(coefficients.result.a[i])
                    console.log(highest)
                    console.log(lowest)


                    this.state.data.datasets.push({
                        type: 'line',
                        fill:false,
                        label: 'Regression '+propData[0][i], // Name the series
                        borderDash:[5],
                        data: [{x:highest,y:FmaxPoint+coefficients.result.b},
                            {x:lowest,y:FminPoint+coefficients.result.b}], // Specify the data values array
                        backgroundColor: this.dynamicColors(), // Add custom color background (Points and Fill)
                        borderColor:"yellow",
                        pointRadius:0
                    });
                    lowest = Number.POSITIVE_INFINITY;
                    highest = Number.NEGATIVE_INFINITY;
                    FmaxPoint=0;
                    FminPoint=0;

                    this.state.data.datasets.push(setData);
                }

                this.state.options.legend.display = true;

            }
            if(propData[0][propData[0].length - 1] === "label") {

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
                            label: propData[0][i], // Name the series
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

        }
    }
    render() {
        this.formatData();
        return(
            <Scatter data={this.state.data} options={this.state.options}/>
        );
    }
}

export default Chart;