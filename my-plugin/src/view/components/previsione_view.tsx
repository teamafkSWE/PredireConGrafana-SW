import React, {PureComponent} from 'react';
import {Button, HorizontalGroup, Input, PanelOptionsGroup} from "@grafana/ui";
import Observer from "./observer/observer";
import {Datasource} from "../../types";
import Controller from "../../controller/controller";

interface Props {
    controller: Controller
}

interface State {
    monitoring: boolean
    saving: boolean
    datasources: Datasource[]
    measurement: string
}

class PrevisioneView extends PureComponent<Props, State> implements Observer {
    private readonly selectRef: any;

    constructor(props: Readonly<Props>) {
        super(props);
        this.props.controller.attach(this)
        this.selectRef = React.createRef()
        const measurement = this.props.controller.getMeasurement()
        this.state = {
            monitoring: props.controller.isMonitoring(),
            saving: props.controller.isSaving(),
            datasources: [],
            measurement: measurement === undefined ? "" : measurement
        }
        props.controller.updateDatasources().then(datasources => {
                this.setState({datasources: datasources})
            }
        )
    }

    componentDidUpdate() {
        const datasource = this.props.controller.getDatasource()
        if (datasource === null)
            this.selectRef.current.options.selectedIndex = 0
        else {
            let i = 0
            while (datasource.id != this.state.datasources[i].id)
                i++
            this.selectRef.current.options.selectedIndex = i+1;
        }
    }

    componentWillUnmount() {
        this.props.controller.detach(this)
    }

    update(): void {
        if (this.props.controller.isMonitoring())
            this.setState({monitoring: true})
        else
            this.setState({monitoring: false})

        if (this.props.controller.isSaving())
            this.setState({saving: true})
        else
            this.setState({saving: false})
    }

    private setDatasource = (event: any) => {
        const id = event.target.value
        this.props.controller.setDatasource(id)
        this.forceUpdate()
    }

    private setMeasurement = (event: any) => {
        const measurement = event.target.value
        this.setState({measurement: measurement})
        this.props.controller.setMeasurement(measurement)
    }

    private startMonitoring = () => {
        if (this.props.controller.getConnections().length != 0)
            this.props.controller.startMonitoring()
        else
            alert("Nessun collegamento effettuato")
    }

    private monitoringButton = () => {
        const {monitoring} = this.state
        if (monitoring) {
            return <Button variant={"secondary"} icon={"pause"} onClick={this.props.controller.stopMonitoring}>Interrompi monitoraggio</Button>
        } else {
            return <Button variant={"primary"} icon={"play"} onClick={this.startMonitoring}>Avvia monitoraggio</Button>
        }
    }

    private savingForm = () => {

        const saveButton = () => {
            const {saving, measurement} = this.state
            const datasource = this.props.controller.getDatasource()
            if (saving)
                return <Button variant={"secondary"} onClick={this.props.controller.stopSaving}>Disabilita salvataggio</Button>
            else if (measurement != "" && datasource !== null)
                return <Button variant={"primary"} onClick={this.props.controller.startSaving}>Abilita salvataggio</Button>
            else
                return <Button disabled={true} variant={"primary"} onClick={this.props.controller.startSaving}>Abilita salvataggio</Button>
        }

        const getOptions = () => {
            const options = []
            if (this.state.datasources.length === 0)
                options.push(<option value={" "}>No datasource found</option>)
            else
                for (let ds of this.state.datasources) {
                    options.push(<option value={ds.id}>{ds.name}</option>)
                }
            return options
        }

        return (
            <>
                <div>
                    <label htmlFor={"dbs"}>Selezionare il Data Source:</label>
                    <select ref={this.selectRef} id={"dbs"} onChange={this.setDatasource}>
                        <option value={" "}>Datasource...</option>
                        {getOptions()}
                    </select>
                </div>
                <div>
                    <label htmlFor={"measurement"}>Inserire il nome della misurazione:</label>
                    <Input id={"measurement"} type={"text"} value={this.state.measurement} onChange={this.setMeasurement}/>
                </div>
                {saveButton()}
            </>
        )
    }

    render() {
        return (
            <div>
                <HorizontalGroup>
                    <PanelOptionsGroup title="Monitoraggio">
                        {this.monitoringButton()}
                    </PanelOptionsGroup>

                    <PanelOptionsGroup title="Salvataggio">
                        {this.savingForm()}
                    </PanelOptionsGroup>
                </HorizontalGroup>
            </div>
        );
    }
}

export default PrevisioneView;
