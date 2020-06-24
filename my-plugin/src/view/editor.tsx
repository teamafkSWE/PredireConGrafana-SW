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

interface State {
    status: "loading" | "loaded"
}

class Editor extends PureComponent<PanelEditorProps<Options>, State> {
    private _controller: Controller | undefined;

    constructor(props: Readonly<PanelEditorProps<Options>>) {
        super(props);
        this.state = {status: "loading"}
        setTimeout(() => {
            while (this.props.data.request === undefined)
                console.log("loading"); //aspetta che venga caricata la request
            this.setState({status: "loaded"})
        }, 0)
    }

    render() {
        if (this.state.status === "loaded" && this.props.data.request != undefined) {

            if (this._controller === undefined)
                this._controller = Controller.requireController(this.props.data.request.panelId)

            return (
                <UseState initialState={tabs}>
                    { //children
                        (state, updateState) => { //state contiene le tabs definite sopra, updateState è una funzione che prende 1 parametro che è il nuovo stato
                            if (this._controller != undefined)
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
                                            {state[0].active && <CaricamentoJsonView controller={this._controller}/>}
                                            {state[1].active && <CollegamentoView queries={this.props.data.series}
                                                                                  addConnection={this._controller.addConnection}
                                                                                  getFile={this._controller.getFile}
                                                                                  getPredictors={this._controller.getPredictors}
                                                                                  setThresholds={this._controller.setThresholds}
                                                                                  getThresholds={this._controller.getThresholds}
                                            />}
                                            {state[2].active && <ListaCollegamentiView getConnections={this._controller.getConnections}
                                                                                       controller={this._controller}
                                                                                       queries={this.props.data.series}
                                            />}
                                            {state[3].active && <PrevisioneView isMonitoring={this._controller.isMonitoring}
                                                                                startMonitoring={this._controller.startMonitoring}
                                                                                stopMonitoring={this._controller.stopMonitoring}
                                                                                startSaving={this._controller.startSaving}
                                                                                stopSaving={this._controller.stopSaving}
                                                                                isSaving={this._controller.isSaving}
                                                                                getConnections={this._controller.getConnections}
                                                                                getDatasources={this._controller.updateDatasources}
                                                                                setDatasource={this._controller.setDatasource}
                                                                                getUsedDatasource={this._controller.getDatasource}
                                                                                getMeasurement={this._controller.getMeasurement}
                                                                                setMeasurement={this._controller.setMeasurement}
                                                                                attach={this._controller.attach}
                                                                                detach={this._controller.detach}/>}
                                        </TabContent>
                                    </>
                                );
                            else
                                return <p>Qualcosa è andato storto... prova ad aggiornare la pagina!</p>
                        }
                    }
                </UseState>
            );
        } else //la request non è ancora caricata, quindi non è presente il controller
            return <p>Loading</p>
    }
}

export default Editor;