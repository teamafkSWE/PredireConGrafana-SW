import React, {Component} from "react";
import {Scatter} from "react-chartjs-2";

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
            }
        },

    }


    formatData=()=> {
        this.state.data.datasets = [];
        if (this.props.hasFile !== false) {
            if (this.props.viewModel.isSVM()) {
                this.state.data.datasets = this.props.viewModel.SVMChart().data;
                this.state.options.legend.display = this.props.viewModel.SVMChart().legend;
            }
            else{
                let rlChart=this.props.viewModel.RLChart();
                this.state.data.datasets =rlChart.data;
                this.state.options.legend.display=rlChart.legend;
                this.state.options.scales.yAxes[0].scaleLabel.labelString=rlChart.yAxis;
                this.state.options.scales.xAxes[0].scaleLabel.labelString=rlChart.xAxis;
                this.state.options.scales.yAxes[0].scaleLabel.display=true;
                this.state.options.scales.xAxes[0].scaleLabel.display=true;
                if(this.props.json!==null){
                    this.state.data.datasets.push(this.props.viewModel.straightLine());
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