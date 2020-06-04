import React, {PureComponent} from "react";
import {ArrayVector, FieldColorMode, FieldType, GraphSeriesXY, PanelProps} from "@grafana/data";
import {Options} from "../types";
import Controller from "../controller/controller";
import {Graph} from "@grafana/ui";

export default class Panel extends PureComponent<PanelProps<Options>>{
    private _controller: Controller = this.props.options.controller;
    private _series: GraphSeriesXY[] = [];

    //inserisco dentro _series una linea per ogni collegamento impostato
    private _setupGraphSeries = () => {
        this._controller.getListPredictorQuery().forEach((element, idx) => {
            this._series.push({ // linea
                //array 2d, primo valore è il timestamp, il secondo è il valore da mostrare
                data: this._controller.getPredictedData(element.name), //aggiorno i punti del grafico
                color: 'red', //colore della linea todo: impostare colore random
                isVisible: true, //visibilità della linea (non credo abbia senso metterlo false)
                label: element.name, //nome della linea, che equivale al nome del collegamento
                seriesIndex: idx, //indice della linea (forse per indicare quale linea deve stare davanti e quale dietro)
                timeField: {//non ho idea di cosa serva
                    type: FieldType.time,
                    name: 'time',
                    values: new ArrayVector(),
                    config: {},
                },
                valueField: {//non ho idea di cosa serva
                    type: FieldType.number,
                    name: 'a-series',
                    values: new ArrayVector(),
                    config: {
                        color: {
                            mode: FieldColorMode.Fixed,
                            fixedColor: 'red',
                        },
                    },
                },
                timeStep: 3600000, //vuoto totale
                yAxis: {
                    index: 0, //la cipolla
                },
            })
        })
    }

    render(){
        if (this._controller.isMonitoring()) {
            console.log('panel updating')
            this._controller.updatePredictions(this.props.data.series)
            this._setupGraphSeries()
            console.log(this._series)
        }
        return( <Graph  height={this.props.height}
                        width={this.props.width /*prende la larghezza del monitor*/}
                        series={this._series}
                        timeRange={this.props.data.timeRange /*prende il range orario(last x hours/mins) impostato sulla dashoard*/}
                        timeZone="browser"/>);
    }
}