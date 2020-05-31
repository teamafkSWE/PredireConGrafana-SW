import React, {PureComponent} from 'react';
import {
    PanelOptionsGrid,
    PanelOptionsGroup,
    VerticalGroup,
    Button,
    ConfirmButton

} from "@grafana/ui";
import {DataFrame} from "@grafana/data";
//import {Predictor} from "../../types";


interface MyProps {
    queries: DataFrame[]
    //getPredictors:()=>void
    listSelectPredictors: any[]
}

class CollegamentoView extends PureComponent<MyProps> {
    state={
        data:[] as any
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
                    let name=predictors[i].name+":";
                    temp.push(
                    <label>{name}
                    <select id="collegamento">
                            {queries.map((query:DataFrame ) => <option value={query.name}>{query.name}</option>)}

                    </select></label>
                    );

                }
                console.log(temp)
            } else
                return(<select id="collegamento">
                    <option value="noQ">No query found</option>
                </select>)

           // this.setState({data:this.state});
        }
        else
            return (<select id="collegamento">
                <option value="noP">No file found</option></select>)
        return temp;


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
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere componente per impostazione soglie.</p>
                            </li>
                        </ul>
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