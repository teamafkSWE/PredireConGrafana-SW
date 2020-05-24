import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";

class PrevisioneView extends PureComponent {



    render() {
        return (
            <div>
                <PanelOptionsGrid>

                    <PanelOptionsGroup title="Selezione politica temporale">
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiugere label "Selezionare una politica temporale per la previsione";</p>
                            </li>
                            <li>
                                <p>aggiungere componente per inserimento temporale ore:min:sec.</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Monitoraggio">
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere pulsante di avvio monitoraggio/interruzione;</p>
                            </li>
                            <li>
                                <p>aggiungere componente di salvataggio previsione(?).</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>

                </PanelOptionsGrid>
            </div>


        );
    }
}

export default PrevisioneView;
