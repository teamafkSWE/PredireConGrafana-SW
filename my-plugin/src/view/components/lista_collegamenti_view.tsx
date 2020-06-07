import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup, HorizontalGroup} from "@grafana/ui";
import Controller from "../../controller/controller";
//import Observer from "./observer/observer";
//import {DataFrame} from "@grafana/data";

interface MyProps {
    controller: Controller
}

class ListaCollegamentiView extends PureComponent<MyProps>{
    state={
        listConnection:[] as any
    }
    constructor(props: Readonly<MyProps>) {
        super(props);
        console.log(this.props.controller.getConnections())
       this.state.listConnection=this.props.controller.getConnections()
        console.log(this.state.listConnection)
    }

    handleDelete=(e:any)=>{
        if(confirm("Scollegare il collegamento?")){
            this.props.controller.removeListPredictorQuery(e.target.id);
            this.setState({listConnection:this.props.controller.getConnections()});
            console.log(this.state.listConnection)
            this.forceUpdate();
        }
    }
    showConnection=()=>{
        let listConn=this.state.listConnection;
        let viewNameList=[];
        if(listConn.length=== 0)
            return <label style={{fontStyle: "italic"}}>Nessun collegamento inserito.</label>
        else {
            for (let i=0;i<listConn.length;i++) {
                let id=listConn[i].id;
                let name=listConn[i].name;
                let list=listConn[i].queries;
                viewNameList.push(
                    <div>
                        <HorizontalGroup>
                            <label>{name}:</label>
                            <button id={id} className='btn btn-secondary btn-sm'>Modifica collegamento</button>
                            <button id={id} onClick={this.handleDelete} className='btn btn-secondary btn-sm'>Elimina Collegamento</button>
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

                </PanelOptionsGrid>
            </div>
        );
    }
}

export default ListaCollegamentiView;
