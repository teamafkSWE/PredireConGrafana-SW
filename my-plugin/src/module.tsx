// Angular pages
import React, {PureComponent} from 'react';
import {PanelProps, PanelPlugin, GraphSeriesXY, FieldColorMode, ArrayVector, FieldType, dateTime} from '@grafana/data';
import {Graph} from "@grafana/ui";
import MyPanelEditor from './EditorPanel'

//to remove!
interface MyPanelOptions {
    bitText:string;
}

export class MyPanel extends PureComponent<PanelProps<MyPanelOptions>>{
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
