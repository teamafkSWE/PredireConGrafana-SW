import React, {PureComponent} from 'react';
import {PanelOptionsGroup, VerticalGroup, Button, HorizontalGroup} from "@grafana/ui";
import Controller from "../../controller/controller";
import {DataFrame} from "@grafana/data";
import FormEdit from "./form_edit"


interface Props {
    queries: DataFrame[],
    controller: Controller
}

class ListaCollegamentiView extends PureComponent<Props> {
    state = {
        isEditClicked: false,
        idEdit: ""
    }

    handleDelete = (id: string) => {
        if (confirm("Scollegare il predittore?")) {
            this.props.controller.removeListPredictorQuery(id);
            this.forceUpdate();
        }
    }
    handleEdit = (id: string) => {
        this.setState({isEditClicked: true, idEdit: id});
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
        this.setState({isEditClicked: false, idEdit: ""});
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
                    {this.state.isEditClicked && <FormEdit idEdit={this.state.idEdit} closeEdit={this.closeEdit} controller={this.props.controller} queries={this.props.queries}/>}
                </HorizontalGroup>
            </div>
        );
    }
}

interface CollegamentoProps {
    id: string
    nome: string
    links: { predictor: string, query: string }[]
    onModify: (id: string) => void
    onRemove: (id: string) => void
}

const Collegamento: React.FC<CollegamentoProps> = (props) => {
    const predictors: string[] = []
    const nodes: string[] = []
    props.links.forEach(link => {
        predictors.push(link.predictor);
        nodes.push(link.query)
    })
    return (
        <>
            <div style={{width: "100%", border: "1pt solid white", borderRadius: "3pt", minWidth: "12rem", marginTop: ".8rem"}}>
                <p style={{textAlign: "center", borderBottom: "1pt solid white", margin: "0", padding: "0.4rem 0 0.4rem", fontSize: "1.2rem"}}>{props.nome}</p>

                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <div style={{width: "100%"}}>
                        <p style={{
                            textAlign: "center",
                            width: "100%",
                            margin: "0",
                            padding: "0.4rem 0.6rem 0.4rem",
                            borderRight: "1pt solid white",
                            borderBottom: "1pt solid white"
                        }}>
                            Predittore
                        </p>
                        {predictors.map(predictor =>
                            <p style={{textAlign: "center", width: "100%", margin: "0", padding: "0.2rem 0.6rem 0.2rem"}}>
                                {predictor}
                            </p>
                        )}
                    </div>
                    <div style={{width: "100%"}}>
                        <p style={{textAlign: "center", width: "100%", margin: "0", padding: "0.4rem 0.6rem 0.4rem", borderBottom: "1pt solid white"}}>
                            Nodo
                        </p>
                        {nodes.map(node =>
                            <p style={{textAlign: "center", width: "100%", margin: "0", padding: "0.2rem 0.6rem 0.2rem"}}>
                                {node}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", width: "100%", margin: ".75rem 0 .5rem"}}>
                <Button style={{margin: "0 .5rem 0"}} onClick={() => props.onModify(props.id)}>Modifica</Button>
                <Button style={{margin: "0 .5rem 0"}} onClick={() => props.onRemove(props.id)}>Scollega</Button>
            </div>
        </>
    )
}

export default ListaCollegamentiView;
