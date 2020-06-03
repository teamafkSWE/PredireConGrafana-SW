import React, {PureComponent} from 'react';
import {Button, PanelOptionsGrid, PanelOptionsGroup} from "@grafana/ui";
//import Calendar from 'react-calendar'
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class PrevisioneView extends PureComponent  {

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
                    </PanelOptionsGroup>

                </PanelOptionsGrid>
            </div>


        );
    }
}

export default PrevisioneView;
