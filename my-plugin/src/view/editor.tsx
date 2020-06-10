import React, {PureComponent} from 'react';
import {PanelEditorProps} from "@grafana/data";
import {Tab, TabContent, TabsBar} from "@grafana/ui";
import {UseState} from "./use_state";
import CaricamentoJsonView from "./components/caricamento_json_view";
import CollegamentoView from "./components/collegamento_view";
import ListaCollegamentiView from "./components/lista_collegamenti_view";
import PrevisioneView from "./components/previsione_view";
import Controller from "../controller/controller";
import {Options} from "../types";
import "./components/css/index.css"


const tabs = [
    {label: 'Caricamento JSON', key: 'first', active: true},
    {label: 'Collegamento', key: 'second', active: false},
    {label: 'Lista Collegamenti', key: 'third', active: false},
    {label: 'Previsione', key: 'fourth', active: false},
];


class Editor extends PureComponent<PanelEditorProps<Options>> {
    private _controller: Controller = this.props.options.controller;

    render() {
        return (
            <UseState initialState={tabs}>
                { //children
                    (state, updateState) => { //state contiene le tabs definite sopra, updateState è una funzione che prende 1 parametro che è il nuovo stato
                        return (
                            <>
                                <TabsBar>
                                    {
                                        state.map((tab, index) => {
                                            return ( //ritorna una tab per ogni tab contenuta in tabs
                                                <Tab
                                                    key={index}
                                                    label={tab.label}
                                                    active={tab.active}
                                                    onChangeTab={() => updateState( //invodo il cambiamento dello stato, in questo caso gli passo il nuovo stato
                                                        state.map((tab, idx) => (   //le differenze saranno che lo active cambierà in base a quale tab è stata cliccata
                                                            {...tab, active: idx === index}
                                                        ))
                                                    )}
                                                />
                                            );
                                        })
                                    }
                                </TabsBar>
                                 <TabContent>
                                {state[0].active && <CaricamentoJsonView controller={this._controller} /> }
                                {state[1].active && <CollegamentoView queries={this.props.data.series}
                                                                      controller={this._controller}
                                />}
                                {state[2].active && <ListaCollegamentiView  controller={this._controller} queries={this.props.data.series}/>}
                                {state[3].active && <PrevisioneView isMonitoring={this._controller.isMonitoring} start={this._controller.startMonitoring} stop={this._controller.stopMonitoring} attach={this._controller.attach} detach={this._controller.detach}/>}
                            </TabContent>
                            </>
                        );
                    }
                }
            </UseState>
        );
    }
}

export default Editor;