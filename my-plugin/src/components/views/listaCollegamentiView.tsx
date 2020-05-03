import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";

class ListaCollegamentiView extends PureComponent {



    render() {
        return (
            <div>
                <PanelOptionsGrid>

                    <PanelOptionsGroup title="Lista collegamenti">
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiugere label "Selezionare collegamento";</p>
                            </li>
                            <li>
                                <p>aggiungere componente lista per la selezione dei collegamenti.</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Opzioni collegamenti">
                        <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere pulsante di modifica;</p>
                            </li>
                            <li>
                                <p>aggiungere pulsante di scollegamento;</p>
                            </li>
                            <li>
                                <p>aggiungere pulsante di nuovo collegamento;</p>
                            </li>
                        </ul>
                    </PanelOptionsGroup>
                </PanelOptionsGrid>

            </div>


        );
    }
}

export default ListaCollegamentiView;
