import React, {PureComponent} from "react";
import {ArrayVector, dateTime, FieldColorMode, FieldType, GraphSeriesXY, PanelProps} from "@grafana/data";
import {Options} from "../types";
import Controller from "../controller/controller";
import {Graph} from "@grafana/ui";

export default class Panel extends PureComponent<PanelProps<Options>>{
    private _controller: Controller = this.props.options.controller;
    series: GraphSeriesXY[] = [
        {
            data: [
                [1546372800000, 60],
                [1546376400000, 20],
                [1546380000000, 10],
            ],
            color: 'red',
            isVisible: true,
            label: 'A-series',
            seriesIndex: 0,
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
                index: 0,
            },
        }

    ];
    render(){
        console.log(this._controller) //serve a togliere l'errore di non usare la variabile
        this.props.data.series.forEach(serie => serie.fields.forEach(values => console.log(values.values.toArray())))
        return( <Graph  height={300}
                        width={600}
                        series={this.series}
                        timeRange={{
                            from: dateTime(1546372800000),
                            to: dateTime(1546380000000),
                            raw: {
                                from: dateTime(1546372800000),
                                to: dateTime(1546380000000),
                            },
                        }}
                        timeZone="browser"/>);
    }
}