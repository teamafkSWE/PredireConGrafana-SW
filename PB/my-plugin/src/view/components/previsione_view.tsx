import React, {PureComponent} from 'react';
import {Button, HorizontalGroup, PanelOptionsGroup} from "@grafana/ui";
import "react-datepicker/dist/react-datepicker.css";
import Observer from "./observer/observer";


interface Props {
    start: () => void
    stop: () => void
    isMonitoring: () => boolean
    attach: (o:Observer) => void
    detach: (o:Observer) => void
}

class PrevisioneView extends PureComponent<Props> implements Observer{

    state = {
        startDate: new Date(),
        endDate: new Date(),
        monitoring: false
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.props.attach(this)
        this.state.monitoring = this.props.isMonitoring()
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
                <HorizontalGroup>
                    <PanelOptionsGroup title="Avvia monitoraggio">
                        {this.startStopButton()}
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Salva previsione">
                        <Button>Salva previsione</Button>
                    </PanelOptionsGroup>
                </HorizontalGroup>
            </div>
        );
    }
}

export default PrevisioneView;
