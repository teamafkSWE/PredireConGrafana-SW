// Angular pages
import React, {PureComponent} from 'react';
import {PanelProps, PanelPlugin, GraphSeriesXY, FieldColorMode, ArrayVector, FieldType, dateTime} from '@grafana/data';
import {Graph} from "@grafana/ui";
import MyPanelEditor from './EditorPanel'
interface MyPanelOptions {
    bitText:string;
}

export class MyPanel extends PureComponent<PanelProps<MyPanelOptions>>{
    series: GraphSeriesXY[] = [
        {
            data: [
                [1546372800000, 10],
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
        },
        {
            data: [
                [1546372800000, 20],
                [1546376400000, 30],
                [1546380000000, 40],
            ],
            color: 'blue',
            isVisible: true,
            label:
                "B-series with an ultra wide label that probably gonna make the tooltip to overflow window. This situation happens, so let's better make sure it behaves nicely :)",
            seriesIndex: 1,
            timeField: {
                type: FieldType.time,
                name: 'time',
                values: new ArrayVector([1546372800000, 1546376400000, 1546380000000]),
                config: {},
            },
            valueField: {
                type: FieldType.number,
                name:
                    "B-series with an ultra wide label that is probably going go make the tooltip overflow window. This situation happens, so let's better make sure it behaves nicely :)",
                values: new ArrayVector([20, 30, 40]),
                config: {
                    color: {
                        mode: FieldColorMode.Fixed,
                        fixedColor: 'blue',
                    },
                },
            },
            timeStep: 3600000,
            yAxis: {
                index: 0,
            },
        },
    ];
    render(){
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

export const plugin = new PanelPlugin(MyPanel);
plugin.setEditor(MyPanelEditor);
