import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup, Button, HorizontalGroup} from "@grafana/ui";
import Controller from "../../controller/controller";
//import {DataFrame} from "@grafana/data";

interface MyProps {

    controller: Controller
}

class ListaCollegamentiView extends PureComponent<MyProps> {
    showId=(e:any)=>{

       // console.log(e.target.id);
        this.props.controller.removeListPredictorQuery(e.target.id);
    }
    showConnection=()=>{
        let objNameList=this.props.controller.getListPredictorQuery();
        let viewNameList=[];

        console.log(objNameList);
        if(objNameList.length=== 0)
            return <label style={{fontStyle: "italic"}}>Nessun collegamento inserito.</label>
        else {
            for (let i=0;i<objNameList.length;i++) {
                let id=objNameList[i].id;
                let name=objNameList[i].name;
                let list=objNameList[i].list;
                viewNameList.push(
                    <div>
                        <HorizontalGroup>
                            <label>{name}:</label>
                            <button  className='btn btn-secondary btn-sm'>Modifica collegamento</button>
                            <button id={id} onClick={this.showId} className='btn btn-secondary btn-sm'>Elimina Collegamento</button>
                        </HorizontalGroup>
                        <p>
                            {list.map((list:any) => <p>{list.predictor} ---> {list.query}</p>)}
                        </p>
                    </div>

                );
            }

            return viewNameList;
        }
    }
    render() {

        return (
            <div>
                <PanelOptionsGrid>

                    <PanelOptionsGroup title="Lista collegamenti">
                        <VerticalGroup>
                            <p style={{fontStyle: "italic"}}>Legenda: Predittore ---> Query</p>
                            {this.showConnection()}
                        </VerticalGroup>

                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Opzioni collegamenti">
                        <p>Clicca per intraprendere un operazione:</p>

                        <VerticalGroup spacing="md">
                            <Button>Modifica collegamento</Button>
                            <Button>Scollega predittore</Button>
                        </VerticalGroup>

                    </PanelOptionsGroup>
                </PanelOptionsGrid>

            </div>


        );
    }
}

export default ListaCollegamentiView;
