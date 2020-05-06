import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup, Button} from "@grafana/ui";

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
                        <p>Clicca per intraprendere un operazione:</p>

                        <VerticalGroup spacing="md">
                            <Button>Modifica collegamento</Button>
                            <Button>Scollega predittore</Button>
                            <Button>Nuovo Collegamento</Button>
                        </VerticalGroup>

                    </PanelOptionsGroup>
                </PanelOptionsGrid>

            </div>


        );
    }
}

export default ListaCollegamentiView;
