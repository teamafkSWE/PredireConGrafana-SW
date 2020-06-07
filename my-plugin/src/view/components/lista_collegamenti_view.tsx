import React, {PureComponent} from 'react';
import { PanelOptionsGroup, VerticalGroup, HorizontalGroup} from "@grafana/ui";
import Controller from "../../controller/controller";
import {DataFrame} from "@grafana/data";
import FormEdit from "./form_edit"
//import Observer from "./observer/observer";

interface MyProps {
    queries: DataFrame[],
    controller: Controller
}

class ListaCollegamentiView extends PureComponent<MyProps>{
    state={
        listConnection:[] as any,
        isEditClicked:false,
        idEdit:""
    }
    constructor(props: Readonly<MyProps>) {
        super(props);
       this.state.listConnection=this.props.controller.getConnections()
    }

    handleDelete=(e:any)=>{
        if(confirm("Scollegare il collegamento?")){
            this.props.controller.removeListPredictorQuery(e.target.id);
            this.setState({listConnection:this.props.controller.getConnections()});
            console.log(this.state.listConnection)
            this.forceUpdate();
        }
    }
    handleEdit=(e:any)=>{
        this.setState({isEditClicked:true,idEdit:e.target.id});
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

                            <button id={id} className='btn btn-secondary btn-sm' onClick={this.handleEdit}>Modifica collegamento</button>
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
    closeEdit=()=>{
        this.setState({isEditClicked:false,idEdit:""});
    }

    render() {

        return (
            <div>
                <HorizontalGroup>

                    <PanelOptionsGroup title="Lista collegamenti">
                        <VerticalGroup>
                            <p style={{fontStyle: "italic"}}>Legenda: Predittore ---> Query</p>
                            {this.showConnection()}
                        </VerticalGroup>

                    </PanelOptionsGroup>
                    {this.state.isEditClicked && <FormEdit idEdit={this.state.idEdit} closeEdit={this.closeEdit} controller={this.props.controller} queries={this.props.queries}/>}
                </HorizontalGroup>
        </div>

        );
    }
}

export default ListaCollegamentiView;
