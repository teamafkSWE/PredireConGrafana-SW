import React, {PureComponent} from 'react';
import {Button, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import {AppEvents, DataFrame} from "@grafana/data";

import Controller from "../../controller/controller";


interface MyProps {
    controller: Controller
    queries: DataFrame[]
    emitter: any
}


//todo: controllare se esiste il caso in cui il json inserito non contenga predittori
class CollegamentoView extends PureComponent<MyProps> {
    private readonly selectRefs: React.RefObject<HTMLSelectElement>[];
    private readonly inputNameRef: React.RefObject<HTMLInputElement>;
    private connectionName: string;
    private connectionLinks: { predictor: string, query: string | null }[]

    constructor(props: Readonly<MyProps>) {
        super(props);
        const predictors = this.props.controller.getPredictors()

        this.selectRefs = new Array(predictors.length)
        for (let i = 0; i < this.selectRefs.length; i++) {
            this.selectRefs[i] = React.createRef()
        }
        this.inputNameRef = React.createRef()

        this.connectionName = ""
        this.connectionLinks = []

        this.resetList()
    }

    private resetList = () => {
        const links = []
        const predictors = this.props.controller.getPredictors();

        for (let predictor of predictors) {
            links.push({predictor: predictor.name, query: null})
        }

        this.connectionLinks = links
    }


    private setName = (e: any) => {
        this.connectionName = e.target.value
    }

    private addLink = (e: any) => {
        const predictorName = e.target.id;
        const queryName = e.target.value;

        for (let i = 0; i < this.connectionLinks.length; i++) {
            if (predictorName === this.connectionLinks[i].predictor) {
                this.connectionLinks[i].query = queryName;
            }
        }
    }

    private setupConnection = () => {
        if (this.connectionName === "") {
            this.props.emitter.emit(AppEvents.alertWarning, ["Inserisci un nome per la connessione"])
        }

        //constrollo che siano stati collegati tutti i predittori
        else {
            let allPredictorLinked = true;

            for (let link of this.connectionLinks) {
                if (link.query === null)
                    allPredictorLinked = false
            }

            if (allPredictorLinked) {
                this.props.controller.addConnection({
                    name: this.connectionName,
                    links: (this.connectionLinks as { predictor: string, query: string }[])
                })
                this.props.emitter.emit(AppEvents.alertSuccess, ["Collegamento inserito."])
                this.resetList()
                //resetto il nome del collegamento
                const ref = this.inputNameRef.current
                if (ref != null)
                    ref.value = ""
                //resetto le select
                for (let i = 0; i < this.selectRefs.length; i++) {
                    const ref = this.selectRefs[i].current
                    if (ref != null){
                        ref.options.selectedIndex = 0
                    }
                }
            } else
                this.props.emitter.emit(AppEvents.alertWarning, ["Collega tutti i predittori."])
        }
    }

    private printPredictors = () => {
        const file = this.props.controller.getFile();
        const {queries} = this.props;

        if (file === undefined) //non è stato inserito il file json
            return (<p>Nessun json inserito, perfavore inserire prima un file json compatibile.</p>)
        else if (queries.length <= 0) //non sono state impostate delle query
            return (<p>Nessuna query impostata, perfavore impostare prima una o più query.</p>)
        else { //è presente un file json compatibile e sono presenti delle query
            const predictors = this.props.controller.getPredictors();
            return (
                <div style={{borderLeft: "white 1px solid", paddingLeft: "1rem"}}>
                    <label htmlFor={"nome_collegamento"} style={{display: "block"}}>Nome del collegamento:</label>
                    <input type="text" placeholder="nome" id="nome_collegamento"
                           onChange={this.setName} style={{width: "100%", border: "1px solid #262628"}} ref={this.inputNameRef}/>
                    {predictors.map((predictor, index) => //per ogni predittore mostro una selezione tra tutte le query
                        <div style={{display: "flex", justifyContent: "space-between", marginTop: "0.8rem"}}>
                            <label style={{alignSelf: "center"}} htmlFor={predictor.name}>{predictor.name}:</label>
                            <select ref={this.selectRefs[index]} id={predictor.name} onChange={this.addLink} style={{marginLeft: "0.8rem"}}>
                                <option value={" "}>Seleziona il nodo</option>
                                {queries.map((query: DataFrame) =>
                                    <option value={query.name}>{query.name}</option>)
                                }
                            </select>
                        </div>
                    )}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Lista predittori">
                        <VerticalGroup>
                            <p style={{fontStyle: "italic"}}>
                                Attenzione: effettuare i collegamenti per tutti i predittori.
                            </p>
                            {this.printPredictors()}
                            <Button onClick={this.setupConnection}>Inserisci collegamento</Button>
                        </VerticalGroup>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Impostazione soglie">
                        {/*<p style={{fontStyle: "italic"}}> Attenzione: vanno impostate entrambe le soglie. </p>*/}
                        {/*<form>*/}
                        {/*    <label htmlFor="sogliaMin">Min:</label>*/}
                        {/*    <input type="number" id="sogliaMin" value={this.state.valueMin} onChange={this.handleChangeMin} style={{marginLeft: "10px"}}/>*/}
                        {/*    <p></p>*/}
                        {/*    <label htmlFor="sogliaMax">Max:</label>*/}
                        {/*    <input type="number" id="sogliaMax" value={this.state.valueMax} onChange={this.handleChangeMax} style={{marginLeft: "10px"}}/>*/}
                        {/*    <p></p>*/}
                        {/*</form>*/}
                        {/*<p></p>*/}
                        {/*<Button onClick={this.confermaSoglie}>Conferma soglie</Button>*/}
                    </PanelOptionsGroup>
                    {/*
                        <PanelOptionsGroup title="Conferma">
                            <p style={{fontStyle: "italic"}}> Cliccare il bottone per confermare il collegamento ed aggiungerlo alla lista dei collegamenti disponibili. </p>
                            <Button>Conferma collegamento</Button>
                        </PanelOptionsGroup>
                    */}
                </PanelOptionsGrid>

            </div>


        );
    }

}

export default CollegamentoView;