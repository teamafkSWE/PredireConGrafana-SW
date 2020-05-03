import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";
import InsJson from "../inputJson";

class CaricamentoJsonView extends PureComponent {



    render() {
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Inserimento file JSON">
                    <InsJson/>
                    <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere componente per "drag and drop option".</p>
                            </li>
                        </ul>

                    </PanelOptionsGroup>
                    <PanelOptionsGroup title="Contenuto file JSON">
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere componente per la visualizzazione del file JSON;</p>
                            </li>
                            <li>
                                <p>aggiungere link al tool esterno per addestramento.</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>


                </PanelOptionsGrid>

            </div>


        );
    }
}

export default CaricamentoJsonView;
