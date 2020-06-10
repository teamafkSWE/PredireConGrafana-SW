import React, { PureComponent } from 'react';
import { PanelOptionsGroup, VerticalGroup } from "@grafana/ui";
import { DataFrame } from "@grafana/data";
//import {DataFrame, timeZoneAbbrevation} from "@grafana/data";

import Controller from "../../controller/controller";

//import {Predictor} from "../../types";


interface MyProps {
    queries: DataFrame[]
    closeEdit:()=>void
    idEdit: string
    controller: Controller
}


class FormEdit extends PureComponent<MyProps> {
    state= {
        nameConnection: "",
        connectionsList: [] as any,
        editConnection:[] as any

    }

    constructor(props: Readonly<MyProps>) {
        super(props);
        let editConnection = this.props.controller.getConnections();
        for (let i = 0; i < editConnection.length; i++) {
            if(editConnection[i].id===this.props.idEdit)
                this.state.editConnection=editConnection[i];
        }
       this.state.nameConnection=this.state.editConnection.name;

        this.resetList();
    }
    resetList=()=>{
        this.state.connectionsList=[];
        let listSelectPredictors = this.props.controller.getPredictors();
        for (let i = 0; i < listSelectPredictors.length; i++) {
            this.state.connectionsList.push({ predictor: listSelectPredictors[i].name, query: undefined })
        }
    }
    getPredictors = () => {
        let predictors = this.props.controller.getPredictors();
        const { queries } = this.props;

        let temp = [];


        for (let i = 0; i < predictors.length; i++) {
            let name = predictors[i].name;
            temp.push(
                <p>
                    <label>{name}:
                        <select id={name} onChange={this.pushConnectionsList} style={{ margin: "10px" }}>
                            <option value="" >Seleziona il nodo</option>
                            {queries.map((query: DataFrame) => <option value={query.name}>{query.name}</option>)}
                        </select></label>
                </p>
            );
        }

        return (
            <div>
                <label htmlFor={"nome_collegamento"}>Nome del collegamento:</label>
                <input type="text" value={this.state.nameConnection} placeholder="nome_collegamento" id="nome_collegamento" onChange={this.setName} style={{ marginLeft: "10px" }} />
                {temp}
            </div>
        );
    }
    setName = (e: any) => {
        this.setState({nameConnection: e.target.value})
    }

    pushConnectionsList = (e: any) => {
        for (let i = 0; i < this.state.connectionsList.length; i++) {
            if (e.target.id === this.state.connectionsList[i].predictor) {
                this.state.connectionsList[i].query = e.target.value;
            }
        }
    }

    sendConnectionToController = () => {
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
                        this.props.controller.editListPredictorQuery(this.props.idEdit,{
                            name: this.state.nameConnection,
                            list: (this.state.connectionsList as { predictor: string, query: string }[])
                        })
                        this.resetList();
                        this.props.closeEdit();
                        alert("Collegamento modificato.")
                    } else
                        alert("Collega tutti i predittori.")
                }
                else
                    alert("inserisci query.")
        }
    }



    render() {
        return (
            <div>
                <PanelOptionsGroup title="Edit connection">
                    <VerticalGroup>
                        {this.getPredictors()}
                        <button className='btn btn-secondary btn-sm' onClick={this.sendConnectionToController}>Save</button>
                        <button className='btn btn-secondary btn-sm' onClick={this.props.closeEdit}>Cancel</button>
                    </VerticalGroup>
                </PanelOptionsGroup>
            </div>
        );
    }
}

export default FormEdit;

//Readd to matching group "Flusso dati"
//<InserimentoDB />

