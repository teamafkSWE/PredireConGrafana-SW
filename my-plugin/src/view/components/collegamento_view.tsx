import React, {PureComponent} from 'react';
import {Button, ConfirmButton, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import {DataFrame} from "@grafana/data";
//import {DataFrame, timeZoneAbbrevation} from "@grafana/data";

import Controller from "../../controller/controller";

//import {Predictor} from "../../types";


interface MyProps {
    queries: DataFrame[]
    //getPredictors:()=>void
    controller: Controller
}

class CollegamentoView extends PureComponent<MyProps> {
    state={
        valueMin: 0,
        valueMax: 0,
        nameConnection: "",
        connectionsList: [] as any
    }

    constructor(props: Readonly<MyProps>) {
        super(props);

        const min = this.props.controller.getSogliaMin()
        this.state.valueMin = min === undefined ? 0 : min

        const max = this.props.controller.getSogliaMax()
        this.state.valueMax = max === undefined ? 0 : max
        let listSelectPredictors=this.props.controller.getPredictors();
        for (let i=0;i<listSelectPredictors.length;i++) {
            this.state.connectionsList.push({predictor:listSelectPredictors[i].name,query:undefined})
        }
    }

    getOptions = (queries: DataFrame[]) => {
        if (queries.length > 0) {
            return <>{queries.map((query:DataFrame ) => <option value={query.name}>{query.name}</option>)}</>
        } else
            return <option value="noQ">No query found</option>
    }


    getPredictors = () =>{
        let predictors=this.props.controller.getPredictors();
        const {queries} = this.props;

        let temp=[];
        if (predictors.length !== 0) {
            if (queries.length > 0) {

                for (let i=0;i<predictors.length;i++) {
                    let name=predictors[i].name;
                    temp.push(

                        <label>{name}:
                            <select id={name} onChange={this.pushConnectionsList}>
                                <option value="">select node</option>
                                {queries.map((query:DataFrame ) => <option value={query.name}>{query.name}</option>)}
                            </select></label>
                    );
                }
            } else
                return(<select id="collegamento">
                    <option value="noQ">No query found</option>
                </select>)
        }
        else
            return (<select id="collegamento">
                <option value="noP">No file found</option></select>)
        return (
            <div>
            <input type="text" placeholder="enter name connection" onChange={this.setName} />
            {temp}
            </div>
        );
    }


    setName=(e:any)=>{
        this.setState({nameConnection:e.target.value})
    }
    pushConnectionsList=(e:any)=>{

        for (let i=0;i<this.state.connectionsList.length;i++) {
            if(e.target.id===this.state.connectionsList[i].predictor){
                this.state.connectionsList[i].query=e.target.value;
            }
        }

    }
    sendConnectionToController=()=>{
        let notUndefined=true;
        for (let i=0;i<this.state.connectionsList.length;i++) {
           if(this.state.connectionsList[i].query===undefined || this.state.nameConnection==="")
               notUndefined=false;
        }

        if(notUndefined){

            this.props.controller.setListPredictorQuery({name:this.state.nameConnection,list:this.state.connectionsList})
            alert("collegamento inserito");
        }
        else
            alert("collega tutti i predittori");
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
        console.log(this.state.nameConnection)
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Lista predittori">
                        <VerticalGroup>
                            <p>Selezionare uno o più predittori dalla lista</p>
                                <label htmlFor="predictors">Select predictors:</label>
                            {this.getPredictors()}
                            <button onClick={()=>this.sendConnectionToController()}>prova</button>
                        </VerticalGroup>

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