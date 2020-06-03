import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, Button} from "@grafana/ui";
import Observer from "./observer/observer";

interface Props {
    start: () => void
    stop: () => void
    isMonitoring: () => boolean
    attach: (o:Observer) => void
    detach: (o:Observer) => void
}

interface State {
    monitoring: boolean
}

class PrevisioneView extends PureComponent<Props, State> implements Observer{

    constructor(props: Readonly<Props>) {
        super(props);
        this.props.attach(this)
        this.state = {
            monitoring: false
        }
    }

    componentWillUnmount() {
        this.props.detach(this)
    }

    update(): void {
        if (this.props.isMonitoring())
            this.setState({monitoring: true})
        else
            this.setState({monitoring: false})
    }

    private startStopButton = () => {
        const {monitoring} = this.state
        if (monitoring) {
            return <Button variant={"secondary"} icon={"pause"} onClick={this.props.stop}>Interrompi monitoraggio</Button>
        }
        else {
            return <Button variant={"primary"} icon={"play"} onClick={this.props.start}>Avvia monitoraggio</Button>
        }
    }

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
                        {this.startStopButton()}
                        <h1>TO DO: </h1>
                        <ul>
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
