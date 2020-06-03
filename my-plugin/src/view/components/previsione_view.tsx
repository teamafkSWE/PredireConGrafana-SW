import React, {PureComponent} from 'react';
import {Button, PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";
//import Calendar from 'react-calendar'
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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

    state = {
        startDate: new Date(),
        endDate: new Date()
    };

    handleChangeStartDate = (date:any) => {
        this.setState({
            startDate: date
        });
    };

    handleChangeEndDate = (date:any) => {
        this.setState({
            endDate: date
        });
    };

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
                        <p>Definisci la politica temporale:</p>
                        <form id="datePicker">
                            <label htmlFor="datePickerStart">Seleziona la data di inizio:</label>
                            <div id="datePickerStart">
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={this.state.startDate}
                                    onChange={this.handleChangeStartDate}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                />
                            </div>
                            <p></p>
                            <label htmlFor="datePickerEnd">Seleziona la data di fine:</label>
                            <div id="datePickerEnd">
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={this.state.endDate}
                                    onChange={this.handleChangeEndDate}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    minDate={this.state.startDate}
                                />
                            </div>
                        </form>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Monitoraggio">
                        <div id="bottoniMonitoraggio" style={{display: "inline-block"}}>
                            <Button>Avvia monitoraggio</Button>
                            <Button style={{marginLeft: "20px"}}>Interrompi monitoraggio</Button>
                        </div>
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Salvataggio previsione">
                        <Button>Salva previsione</Button>
                        {this.startStopButton()}
                    </PanelOptionsGroup>

                </PanelOptionsGrid>
            </div>


        );
    }
}

export default PrevisioneView;
