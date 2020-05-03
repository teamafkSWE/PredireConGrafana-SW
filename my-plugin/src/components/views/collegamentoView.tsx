import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";
import InserimentoDB from "../db_tab";

class CollegamentoView extends PureComponent {



    render() {
        return (
            <div>
                <PanelOptionsGrid>

                    <PanelOptionsGroup title="Lista predittori">

                        <h1>TO DO: </h1>
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
//<InserimentoDB queries={this.props.data.series}/>