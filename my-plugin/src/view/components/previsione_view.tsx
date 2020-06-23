import React, {PureComponent} from 'react';
import {Button, HorizontalGroup, Input, PanelOptionsGroup} from "@grafana/ui";
import Observer from "./observer/observer";
import {Connection, Datasource} from "../../types";

interface Props {
    startMonitoring: () => void
    stopMonitoring: () => void
    startSaving: () => void
    stopSaving: () => void
    isMonitoring: () => boolean
    isSaving: () => boolean
    getConnections: () => Connection[]
    attach: (o: Observer) => void
    detach: (o: Observer) => void
    getDatasources: () => Promise<Datasource[]>
    getUsedDatasource: () => Datasource | null
    setDatasource: (id: number) => void
    setMeasurement: (measurement: string) => void
    getMeasurement: () => string | undefined
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
        this.props.attach(this)
        this.selectRef = React.createRef()
        const measurement = this.props.getMeasurement()
        this.state = {
            monitoring: props.isMonitoring(),
            saving: props.isSaving(),
            datasources: [],
            measurement: measurement === undefined ? "" : measurement
        }
        props.getDatasources().then(datasources => {
                this.setState({datasources: datasources})
            }
        )
    }

    componentDidMount() {
        const datasource = this.props.getUsedDatasource()
        let index = 0
        if (datasource != null) {
            while (datasource.id != this.state.datasources[index].id) {
                index++
            }
        }
        this.selectRef.current.options.selectedIndex = index
    }

    componentWillUnmount() {
        this.props.detach(this)
    }

    update(): void {
        if (this.props.isMonitoring())
            this.setState({monitoring: true})
        else
            this.setState({monitoring: false})

        if (this.props.isSaving())
            this.setState({saving: true})
        else
            this.setState({saving: false})
    }

    private setDatasource = (event: any) => {
        const id = event.target.value
        this.props.setDatasource(id)
    }

    private setMeasurement = (event: any) => {
        const measurement = event.target.value
        this.setState({measurement: measurement})
        this.props.setMeasurement(measurement)
    }

    private startMonitoring = () => {
        if (this.props.getConnections().length != 0)
            this.props.startMonitoring()
        else
            alert("Nessun collegamento effettuato")
    }

    private monitoringButton = () => {
        const {monitoring} = this.state
        if (monitoring) {
            return <Button variant={"secondary"} icon={"pause"} onClick={this.props.stopMonitoring}>Interrompi monitoraggio</Button>
        } else {
            return <Button variant={"primary"} icon={"play"} onClick={this.startMonitoring}>Avvia monitoraggio</Button>
        }
    }

    private savingForm = () => {

        const saveButton = () => {
            const {saving, measurement} = this.state
            const datasource = this.props.getUsedDatasource()

            if (saving)
                return <Button variant={"secondary"} onClick={this.props.stopSaving}>Disabilita salvataggio</Button>
            else if (measurement != "" && datasource === null)
                return <Button variant={"primary"} onClick={this.props.startSaving}>Abilita salvataggio</Button>
            else
                return <Button disabled={true} variant={"primary"} onClick={this.props.startSaving}>Abilita salvataggio</Button>
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
