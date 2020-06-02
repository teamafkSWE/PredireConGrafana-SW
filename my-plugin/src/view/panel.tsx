import React, {PureComponent} from "react";
import {ArrayVector, FieldColorMode, FieldType, GraphSeriesXY, PanelProps} from "@grafana/data";
import {Options} from "../types";
//import Controller from "../controller/controller";
import {Graph} from "@grafana/ui";

export default class Panel extends PureComponent<PanelProps<Options>>{
    //private _controller: Controller = this.props.options.controller;
    series: GraphSeriesXY[] = [
        { // linea rossa
            data: [ //array 2d, primo valore è il timestamp, il secondo è il valore da mostrare
                [1546372800000, 60],
                [1546376400000, 20],
                [1546380000000, 10],
            ],
            color: 'red', //colore della linea
            isVisible: true, //visibilità della linea (non credo abbia senso metterlo false)
            label: 'A-series', //nome della linea
            seriesIndex: 0, //indice della linea (forse per indicare quale linea deve stare davanti e quale dietro)
            timeField: {
                type: FieldType.time,
                name: 'time',
                values: new ArrayVector([1546372800000, 1546376400000, 1546380000000]),
                config: {},
            },
            valueField: {
                type: FieldType.number,
                name: 'a-series',
                values: new ArrayVector([10, 50, 10]),
                config: {
                    color: {
                        mode: FieldColorMode.Fixed,
                        fixedColor: 'red',
                    },
                },
            },
            timeStep: 3600000,
            yAxis: {
                index: 0,
            },
        },
        { //linea blu
            data: [ //array 2d, primo valore è il timestamp, il secondo è il valore da mostrare
                [1546372800000, 40],
                [1546376400000, 25],
                [1546380000000, 8],
            ],
            color: 'blue', //colore della linea
            isVisible: true, //visibilità della linea (non credo abbia senso metterlo false)
            label: 'B-series', //nome della linea
            seriesIndex: 1,
            timeField: {
                type: FieldType.time,
                name: 'time',
                values: new ArrayVector([1546372800000, 1546376400000, 1546380000000]),
                config: {},
            },
            valueField: {
                type: FieldType.number,
                name: 'a-series',
                values: new ArrayVector([10, 20, 10]),
                config: {
                    color: {
                        mode: FieldColorMode.Fixed,
                        fixedColor: 'red',
                    },
                },
            },
            timeStep: 3600000,
            yAxis: {
                index: 1,
            },
        }
    ];
    render(){
        //console.log(this._controller) //serve a togliere l'errore di non usare la variabile
        this.props.data.series.forEach(serie => serie.fields.forEach(values => console.log(values.values.toArray())))
        return( <Graph  height={this.props.height}
                        width={this.props.width /*prende la larghezza del monitor*/}
                        series={this.series}
                        timeRange={this.props.data.timeRange /*prende il range orario(last x hours/mins) impostato sulla dashoard*/}
                        timeZone="browser"/>);
    }
}