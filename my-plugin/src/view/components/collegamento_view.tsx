import React, { PureComponent } from 'react';
import { Button, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup } from "@grafana/ui";
import { DataFrame } from "@grafana/data";
//import {DataFrame, timeZoneAbbrevation} from "@grafana/data";

import Controller from "../../controller/controller";
import {Predictor} from "../../types";


interface MyProps {
    queries: DataFrame[]
    controller: Controller
    getPredictors: () => Predictor[]
    getFile: () => File | undefined
}

interface State {
    valueMin: number,
    valueMax: number,
    nameConnection: string,
    connectionsList: { predictor: string, query: string | undefined }[]
}

class CollegamentoView extends PureComponent<MyProps, State> {
    state = {
        valueMin: 0,
        valueMax: 0,
        nameConnection: "",
        connectionsList: [] as any
    }
    constructor(props: Readonly<MyProps>) {
        super(props);

        const min = this.props.controller.getSogliaMin()
        const max = this.props.controller.getSogliaMax()

        this.setState({ valueMin: min === undefined ? 0 : min, valueMax: max === undefined ? 0 : max })
      this.resetList();
    }
    private resetList=()=>{
        this.state.connectionsList=[];
        let listSelectPredictors = this.props.controller.getPredictors();
        for (let i = 0; i < listSelectPredictors.length; i++) {
            this.state.connectionsList.push({ predictor: listSelectPredictors[i].name, query: undefined })
        }
    }

    private printPredictors = () => {
        const file = this.props.getFile();
        const { queries } = this.props;

        if (file === undefined) //non è stato inserito il file json
            return (<p>Nessun json inserito, perfavore inserire prima un file json compatibile.</p>)
        else if (queries.length <= 0) //non sono state impostate delle query
            return (<p>Nessuna query impostata, perfavore impostare prima una o più query.</p>)
        else{ //è presente un file json compatibile e sono presenti delle query
            const predictors = this.props.getPredictors();
            return (
                <div>
                    <label htmlFor={"nome_collegamento"}>Nome del collegamento:</label>
                    <input type="text" placeholder="nome del collegamento" id="nome_collegamento" onChange={this.setName}/>
                    {predictors.map(predictor => //per ogni predittore mostro una selezione tra tutte le query
                        <div>
                            <label htmlFor={predictor.name}>{predictor.name}:</label>
                            <select id={predictor.name} onChange={this.pushConnectionsList} style={{ margin: "10px" }}>
                                <option value="" >Seleziona il nodo</option>
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


    private setName = (e: any) => {
        this.setState({nameConnection: e.target.value})
    }

    private pushConnectionsList = (e: any) => {
        for (let i = 0; i < this.state.connectionsList.length; i++) {
            if (e.target.id === this.state.connectionsList[i].predictor) {
                this.state.connectionsList[i].query = e.target.value;
            }
        }
    }

    private sendConnectionToController = () => {
        let notUndefined = true;
        if(this.state.connectionsList.length===0) {
            alert("inserisci file");
        }
        else {
            if(this.props.queries.length>0) {
                for (let i = 0; i < this.state.connectionsList.length; i++) {
                    if (this.state.connectionsList[i].query === undefined || this.state.nameConnection === "")
                        notUndefined = false;
                }

                if (notUndefined) {
                    console.log(this.props.controller.getConnections())
                    this.props.controller.setListPredictorQuery({
                        name: this.state.nameConnection,
                        list: (this.state.connectionsList as { predictor: string, query: string }[])
                    })
                    console.log(this.props.controller.getConnections())
                    this.resetList();
                    alert("Collegamento inserito.")
                } else
                    alert("Collega tutti i predittori.")
            }
            else
                alert("inserisci query.")
        }



    }

    private handleChangeMin = (event: any) => {
        this.setState({ valueMin: event.target.value });
    }

    private handleChangeMax = (event: any) => {
        this.setState({ valueMax: event.target.value });
    }

    private confermaSoglie = (event: any) => {
        //console.log(this.state.valueMin, this.state.valueMax )
        this.props.controller.handleSoglie(this.state.valueMin, this.state.valueMax)
    }

    render() {

        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Lista predittori">
                        <VerticalGroup>
                            <p style={{ fontStyle: "italic" }}>
                                Attenzione: effettuare i collegamenti per tutti i predittori.
                            </p>
                            {this.printPredictors()}
                            <Button onClick={this.sendConnectionToController}>Inserisci collegamento</Button>
                        </VerticalGroup>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Impostazione soglie">
                        <p style={{ fontStyle: "italic" }}> Attenzione: vanno impostate entrambe le soglie. </p>
                        <form>
                            <label htmlFor="sogliaMin">Min:</label>
                            <input type="number" id="sogliaMin" value={this.state.valueMin} onChange={this.handleChangeMin} style={{ marginLeft: "10px" }} />
                            <p></p>
                            <label htmlFor="sogliaMax">Max:</label>
                            <input type="number" id="sogliaMax" value={this.state.valueMax} onChange={this.handleChangeMax} style={{ marginLeft: "10px" }} />
                            <p></p>
                        </form>
                        <p></p>
                        <Button onClick={this.confermaSoglie}>Conferma soglie</Button>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Conferma">
                        <p style={{ fontStyle: "italic" }}> Cliccare il bottone per confermare il collegamento ed aggiungerlo alla lista dei collegamenti disponibili. </p>
                        <Button>Conferma collegamento</Button>
                    </PanelOptionsGroup>

                </PanelOptionsGrid>

            </div>


        );
    }
}

export default CollegamentoView;

//Readd to matching group "Flusso dati"
//<InserimentoDB />