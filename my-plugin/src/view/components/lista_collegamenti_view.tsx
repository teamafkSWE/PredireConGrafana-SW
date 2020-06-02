import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup, Button} from "@grafana/ui";
import Controller from "../../controller/controller";

interface MyProps {

    controller: Controller
}

class ListaCollegamentiView extends PureComponent<MyProps> {


    showConnection=()=>{

        let list=this.props.controller.getListPredictorQuery();
        console.log(list);
        if(list=== undefined)
            return <label>nessun collegamento inserito</label>
        else {
            return (list.map((list:any) => <label>{list.predictor}----->{list.query}</label>))
        }
    }
    render() {

        return (
            <div>
                <PanelOptionsGrid>

                    <PanelOptionsGroup title="Lista collegamenti">
                        <h1>TO DO: </h1>

                        <VerticalGroup>
                            <p>Predittore------->Query</p>
                            {this.showConnection()}
                            <p>---------------------------</p>
                        </VerticalGroup>

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
