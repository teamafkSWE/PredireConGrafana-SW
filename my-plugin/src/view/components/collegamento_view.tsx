import React, {PureComponent} from 'react';
import {Button, ConfirmButton, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import {DataFrame} from "@grafana/data";
import Controller from "../../controller/controller";

//import {Predictor} from "../../types";


interface MyProps {
    queries: DataFrame[]
    //getPredictors:()=>void
    listSelectPredictors: any[]
    controller: Controller
}

class CollegamentoView extends PureComponent<MyProps> {
    state={
        data:[] as any,
        valueMin: 0,
        valueMax: 0
    }

    constructor(props: Readonly<MyProps>) {
        super(props);

        const min = this.props.controller.getSogliaMin()
        this.state.valueMin = min === undefined ? 0 : min

        const max = this.props.controller.getSogliaMax()
        this.state.valueMax = max === undefined ? 0 : max
    }

    getOptions = (queries: DataFrame[]) => {
        if (queries.length > 0) {
            return <>{queries.map((query:DataFrame ) => <option value={query.name}>{query.name}</option>)}</>
        } else
            return <option value="noQ">No query found</option>
    }


    getPredictors = () =>{
        let predictors=this.props.listSelectPredictors;
        const {queries} = this.props;

        let temp=[];
        if (predictors.length !== 0) {
            console.log(queries)
            if (queries.length > 0) {
                for (let i=0;i<predictors.length;i++) {
                    let name=predictors[i].name;
                    temp.push(
                        <label>{name}:
                            <select id={name} onChange={this.prova}>
                                <option value="">select node</option>
                                {queries.map((query:DataFrame ) => <option value={query.name}>{query.name}</option>)}
                            </select></label>
                    );
                }
                console.log(temp)
            } else
                return(<select id="collegamento">
                    <option value="noQ">No query found</option>
                </select>)
        }
        else
            return (<select id="collegamento">
                <option value="noP">No file found</option></select>)
        return temp;
    }

    prova=(e:any)=>{
        console.log(e.target.id);
        console.log(e.target.value);
    }

    handleChangeMin = (event: any) => {
        this.setState({valueMin: event.target.value});
        this.props.controller.setSogliaMin(event.target.value);
    }

    handleChangeMax = (event: any) => {
        this.setState({valueMax: event.target.value});
        this.props.controller.setSogliaMax(event.target.value);
    }

    render() {
        const {queries} = this.props;
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Lista predittori">
                        <VerticalGroup>
                            <p>Selezionare uno o più predittori dalla lista</p>
                                <label htmlFor="predictors">Select predictors:</label>
                            {this.getPredictors()}

                        </VerticalGroup>

                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Selezione del flusso dati">
                        <h1>TO DO: </h1>
                        <label htmlFor="queries">Select query:</label>
                        <select id="queries">
                            {this.getOptions(queries)}
                        </select>
                        <ul>
                            <li>
                                <p>migliorare componente della lista delle query disponibili;</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Impostazione soglie">
                        <form>
                            <label htmlFor="sogliaMin">Min:</label>
                            <input type="number" id="sogliaMin" value={this.state.valueMin} onChange={this.handleChangeMin}/>
                            <p></p>
                            <label htmlFor="sogliaMax">Max:</label>
                            <input type="number" id="sogliaMax" value={this.state.valueMax} onChange={this.handleChangeMax}/>
                            <p></p>
                            {console.log(this.state.valueMin, this.state.valueMax)}
                        </form>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Conferma Collegamento">

                        <VerticalGroup spacing={"lg"}>
                            <ConfirmButton onConfirm={confirm}>Conferma collegamento</ConfirmButton>
                            <Button>Visualizza Collegamenti</Button>
                            <Button>Visualizza Collegamenti</Button>
                            <h1>TO DO: </h1>
                            <ul>
                                <li>
                                    <p>aggiungere button per conferma collegamento("Aggiunge il collegamento alla lista").</p>
                                </li>
                                <li>
                                    <p>aggiungere reference a visualizzazione lista collegamenti.</p>
                                </li>
                            </ul>

                        </VerticalGroup>

                    </PanelOptionsGroup>

                </PanelOptionsGrid>

            </div>


        );
    }
}

export default CollegamentoView;

//Readd to matching group "Flusso dati"
//<InserimentoDB />