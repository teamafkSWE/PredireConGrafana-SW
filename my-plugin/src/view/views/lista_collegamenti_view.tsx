import React, {PureComponent} from 'react';
import {PanelOptionsGroup, VerticalGroup, HorizontalGroup} from "@grafana/ui";
import Controller from "../../controller/controller";
import {DataFrame} from "@grafana/data";
import FormEdit from "../components/form_edit"
import Collegamento from "../components/collegamento";


interface Props {
    queries: DataFrame[],
    controller: Controller
    emitter: any
}

interface State {
    isEditClicked: boolean,
    idConnection: string
}

class ListaCollegamentiView extends PureComponent<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {idConnection: "", isEditClicked: false}
    }


    handleDelete = (id: string) => {
        if (confirm("Scollegare il predittore?")) {
            this.props.controller.removeListPredictorQuery(id);
            this.forceUpdate();
        }
    }
    handleEdit = (id: string) => {
        this.setState({isEditClicked: true, idConnection: id});
    }

    showConnection = () => {
        const connections = this.props.controller.getConnections()
        if (connections.length === 0)
            return <p>Nessun collegamento inserito.</p>
        else {
            const links = []

            for (let connection of connections) {
                links.push(
                    <Collegamento id={connection.id} nome={connection.name} links={connection.links} onRemove={this.handleDelete} onModify={this.handleEdit}/>
                )
            }
            return links
        }
    }

    closeEdit = () => {
        this.setState({isEditClicked: false, idConnection: ""});
    }

    render() {
        return (
            <div>
                <HorizontalGroup>
                    <PanelOptionsGroup title="Lista collegamenti">
                        <VerticalGroup>
                            {this.showConnection()}
                        </VerticalGroup>
                    </PanelOptionsGroup>
                    {this.state.isEditClicked && <FormEdit idConnection={this.state.idConnection}
                                                           closeEdit={this.closeEdit}
                                                           controller={this.props.controller}
                                                           emitter={this.props.emitter}
                                                           queries={this.props.queries}
                    />}
                </HorizontalGroup>
            </div>
        );
    }
}


export default ListaCollegamentiView;
