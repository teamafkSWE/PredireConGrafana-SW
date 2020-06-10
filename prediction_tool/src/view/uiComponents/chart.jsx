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


    formatData=()=> {

        if (this.props.hasFile !== false && this.props.json!=null) {
            this.state.data.datasets = [];
            if (this.props.viewModel.isSVM()) {
                this.state.data.datasets = this.props.viewModel.SVMChart().data;
                this.state.options.legend.display = this.props.viewModel.SVMChart().legend;
            }
            else{
                this.state.data.datasets =this.props.viewModel.RLChart().data;
                this.state.options.legend.display=this.props.viewModel.RLChart().legend;

            }
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