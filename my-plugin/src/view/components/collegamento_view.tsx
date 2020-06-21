import React, {PureComponent} from 'react';
import {Button, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import {DataFrame} from "@grafana/data";

import {Predictor, Threshold} from "../../types";


interface MyProps {
    queries: DataFrame[],
    getPredictors: () => Predictor[],
    getFile: () => File | undefined,
    addConnection: (connection: { name: string, links: { predictor: string, query: string }[] }) => void
    setThresholds: (min: number, max: number) => boolean
    getThresholds: () => Threshold | undefined
}

interface State {
    valueMin: number,
    valueMax: number,
    nameConnection: string,
    predictorsLinks: { predictor: string, query: string | undefined }[]
}

//todo: controllare se esiste il caso in cui il json inserito non contenga predittori
class CollegamentoView extends PureComponent<MyProps, State> {
    private readonly selectRef: any;
    constructor(props: Readonly<MyProps>) {
        super(props);
        const state:State = {valueMin: 0, valueMax: 0, nameConnection: "", predictorsLinks: []}
        const threshold = this.props.getThresholds()
        if (threshold !== undefined) {
            state.valueMax = threshold.max
            state.valueMin = threshold.min
        }
        this.state = state
        this.selectRef = React.createRef()
        this.resetList()
    }

    private resetList=()=>{
        const arr = []
        const predictors = this.props.getPredictors();

        for (let predictor of predictors){
            arr.push({predictor: predictor.name, query: undefined})
        }

        this.state = {valueMax: this.state.valueMax, valueMin: this.state.valueMin, nameConnection: this.state.nameConnection, predictorsLinks: arr}
    }

    private handleChangeMin = (event: any) => {
        this.setState({valueMin: event.target.value});
    }

    private handleChangeMax = (event: any) => {
        this.setState({valueMax: event.target.value});
    }

    private confermaSoglie = () => {
        //console.log(this.state.valueMin, this.state.valueMax )
        this.props.setThresholds(this.state.valueMin, this.state.valueMax)
    }


    private setName = (e: any) => {
        this.setState({nameConnection: e.target.value})
    }

    private addLink = (e: any) => {
        const predictorName = e.target.id;
        const queryName = e.target.value;

        for (let i = 0; i < this.state.predictorsLinks.length; i++) {
            if (predictorName === this.state.predictorsLinks[i].predictor) {
                this.state.predictorsLinks[i].query = queryName;
            }
        }
    }

    private setupConnection = () => {
        //console.log(this.state)
        const file = this.props.getFile()
        const {queries} = this.props;

        if (file === undefined) {
            alert("Inserisci un file Json");
        } else if (this.state.nameConnection === "") {
            alert("Inserisci un nome per la connessione")
        } else if (queries.length <= 0) {
            alert("Imposta delle query")
        }
        //constrollo che siano stati collegati tutti i predittori
        else {
            let allPredictorLinked = true;

            for (let link of this.state.predictorsLinks) {
                if (link.query === undefined)
                    allPredictorLinked = false
            }

            if (allPredictorLinked) {
                //console.log(this.state)
                this.props.addConnection({
                    name: this.state.nameConnection,
                    links: (this.state.predictorsLinks as { predictor: string, query: string }[])
                })
                alert("Collegamento inserito.")
                this.setState({nameConnection: ""})
                this.resetList()
                this.selectRef.current.options.selectedIndex = 0    //resetto la select al valore nullo
            } else
                alert("Collega tutti i predittori.")
        }
    }

    private printPredictors = () => {
        const file = this.props.getFile();
        const {queries} = this.props;

        if (file === undefined) //non è stato inserito il file json
            return (<p>Nessun json inserito, perfavore inserire prima un file json compatibile.</p>)
        else if (queries.length <= 0) //non sono state impostate delle query
            return (<p>Nessuna query impostata, perfavore impostare prima una o più query.</p>)
        else { //è presente un file json compatibile e sono presenti delle query
            const predictors = this.props.getPredictors();
            return (
                <div style={{borderLeft: "white 1px solid", paddingLeft: "1rem"}}>
                    <label htmlFor={"nome_collegamento"} style={{display: "block"}}>Nome del collegamento:</label>
                    <input type="text" placeholder="nome" id="nome_collegamento"
                           onChange={this.setName} style={{width: "100%", border: "1px solid #262628"}} value={this.state.nameConnection}/>
                    {predictors.map(predictor => //per ogni predittore mostro una selezione tra tutte le query
                        <div>
                            <label htmlFor={predictor.name}>{predictor.name}:</label>
                            <select ref={this.selectRef} id={predictor.name} onChange={this.addLink} style={{margin: "0.8rem", width: "80%"}}>
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
                        <p style={{fontStyle: "italic"}}> Attenzione: vanno impostate entrambe le soglie. </p>
                        <form>
                            <label htmlFor="sogliaMin">Min:</label>
                            <input type="number" id="sogliaMin" value={this.state.valueMin} onChange={this.handleChangeMin} style={{marginLeft: "10px"}}/>
                            <p></p>
                            <label htmlFor="sogliaMax">Max:</label>
                            <input type="number" id="sogliaMax" value={this.state.valueMax} onChange={this.handleChangeMax} style={{marginLeft: "10px"}}/>
                            <p></p>
                        </form>
                        <p></p>
                        <Button onClick={this.confermaSoglie}>Conferma soglie</Button>
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