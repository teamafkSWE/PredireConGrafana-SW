import React, {Component} from "react";
import {Scatter} from "react-chartjs-2";
//import * as Zoom from "chartjs-plugin-zoom";

class Chart extends Component{
    state={
        data : {

            datasets: [],

        },
        options:{
            legend: {
                display: true,
                position: "right",
                align: "middle"
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
                    },
                    scaleLabel: {
                        display: false,
                        labelString: null
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
                    },
                    scaleLabel: {
                        display: false,
                        labelString: null
                    }
                }]
            },
           /* pan:{
                enabled:true,
                mode:"xy",
                speed:10
            },
            zoom:{
                enabled:true,
                drag:false,
                mode:"xy"
            }*/
        }

    }

    formatData=()=> {
        this.state.data.datasets = [];
        if (this.props.hasFile !== false) {
            let chart=this.props.viewModel.Chart();
            this.state.data.datasets =chart.data;
            this.state.options.scales.yAxes[0].scaleLabel.labelString=chart.yAxis;
            this.state.options.scales.xAxes[0].scaleLabel.labelString=chart.xAxis;
            this.state.options.scales.yAxes[0].scaleLabel.display=true;
            this.state.options.scales.xAxes[0].scaleLabel.display=true;
            this.state.options.legend.display = true;
            if (this.props.viewModel.isSVM()) {
                this.state.options.legend.display = false;
            }
            if(this.props.json!==null){
                this.state.data.datasets.push(this.props.viewModel.straightLine());
            }

        }
    }

    render() {
        this.formatData();

        return(<div>
                <Scatter data={this.state.data} options={this.state.options} ref={(reference) => this.lineReference = reference}/>

            </div>
            );
    }
}

export default Chart;