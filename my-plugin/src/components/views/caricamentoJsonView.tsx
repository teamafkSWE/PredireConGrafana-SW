import React, {PureComponent} from 'react';
import {HorizontalGroup, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import InsJson from "../inputJson";

interface insJson {
    setData:(arg0:any,arg1:any,arg2:any)=>void
}
class CaricamentoJsonView extends PureComponent<insJson> {



    render() {

        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Inserimento file JSON">
                        <VerticalGroup>
                            <InsJson setData={this.props.setData}/>
                            <HorizontalGroup>
                                <p>or drag here</p>
                            </HorizontalGroup>

                        </VerticalGroup>

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
