
import React, {PureComponent} from 'react';
import {PanelEditorProps} from "@grafana/data";
import {Tab, TabContent, TabsBar} from "@grafana/ui";

//import InsJson from "./components/inputJson";
//import InserimentoDB from "./components/db_tab";
import {UseState} from "./UseState";

import CaricamentoJsonView from "./components/views/caricamentoJsonView";
import CollegamentoView from "./components/views/collegamentoView";
import ListaCollegamentiView from "./components/views/listaCollegamentiView";
import PrevisioneView from "./components/views/previsioneView";


interface MyPanelOptions {
    bitText:string;
}

const tabs = [
    { label: 'Caricamento JSON', key: 'first', active: true },
    { label: 'Collegamento', key: 'second', active: false },
    { label: 'Lista Collegamenti', key: 'third', active: false },
    { label: 'Previsione', key: 'fourth', active: false },
    /*{ label: 'Inserisci DB', key: 'second', active: false },
    { label: 'test', key: 'third', active: false }*/
];



class MyPanelEditor extends PureComponent<PanelEditorProps<MyPanelOptions>>{
    state = {
        predictors: [],
        nameAlgorithm:null,
        coefficienteAng: [],
        firstVar: [],

        json: { //moc of json
            "predictor": [
                "temp",
                "cpu"
            ],
            "result": {
                "b": 0,
                "a": [
                    2,
                    0
                ]
            }
        }
    };

    setData=(nameAlgorithm:any,firstVar:any,coefficienteAng:any,predictors:any)=>{
        this.setState({nameAlgorithm:nameAlgorithm,firstVar:firstVar,coefficienteAng:coefficienteAng,predictors:predictors});

    }


    render() {

        return(
            <UseState initialState={tabs}>
                {(state, updateState) => {
                    return (
                        <div>
                            <TabsBar>
                                {state.map((tab, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            label={tab.label}
                                            active={tab.active}
                                            onChangeTab={() => updateState(state.map((tab, idx) => ({ ...tab, active: idx === index })))}
                                        />
                                    );
                                })}
                            </TabsBar>
                            <TabContent>
                                {state[0].active && <CaricamentoJsonView setData={this.setData} jsonData={this.state}/>}
                                {state[1].active && <CollegamentoView queries={this.props.data.series} json={this.state.json}/>}
                                {state[2].active && <ListaCollegamentiView/>}
                                {state[3].active && <PrevisioneView/>}
                            </TabContent>
                        </div>
                    );
                }}
            </UseState>
        );
    }
}

export default MyPanelEditor;