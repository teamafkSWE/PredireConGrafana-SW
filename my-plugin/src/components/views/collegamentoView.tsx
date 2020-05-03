import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";
import {DataFrame} from "@grafana/data";

//import InserimentoDB from "../db_tab";

interface MyProps {
    queries: DataFrame[]
    json: {
        "predictor": string[],
        "result": {
            "b": number,
            "a": number[]
        }
    } | null
}


class CollegamentoView extends PureComponent<MyProps> {

    getOptions = (queries: DataFrame[]) => {
        if (queries.length > 0) {
            return <>{queries.map((query) => <option value={query.name}>{query.name}</option>)}</>
        } else
            return <option value="noQ">No query found</option>
    }

    getPredictors = (json: { "predictor": string[], "result": { "b": number, "a": number[] } } | null) => {
        if (json === null)
            return <><option value="noJ">No json loaded</option></>
        else
            return <>{json.predictor.map((pred, index) => <option value={index}>{pred}</option>)}</>
    }

    render() {
        const {json, queries} = this.props;
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Lista predittori">
                        <h1>TO DO: </h1>
                        <>
                            <label htmlFor="predictors">Select predictors:</label>
                            <select id="predictors">
                                {this.getPredictors(json)}
                            </select>
                        </>
                        <ul>
                            <li>
                                <p>aggiugere label "Selezionare uno o più predittori dalla lista";</p>
                            </li>
                            <li>
                                <p>aggiungere componente lista per la selezione dei predittori.</p>
                            </li>
                        </ul>
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
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere button per conferma collegamento("Aggiunge il collegamento alla lista").</p>
                            </li>
                            <li>
                                <p>aggiungere reference a visualizzazione lista collegamenti.</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>


                </PanelOptionsGrid>

            </div>


        );
    }
}

export default CollegamentoView;

//Readd to matching group "Flusso dati"
//<InserimentoDB />