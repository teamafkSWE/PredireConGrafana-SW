import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import Files from "react-files";
import Observer from "../observer/observer";
import Controller from "../../controller/controller";
import {AppEvents} from "@grafana/data";

interface Props {
    emitter: any
    controller: Controller
}

class CaricamentoJsonView extends PureComponent<Props> implements Observer {

    constructor(props: Readonly<Props>) {
        super(props);
        props.controller.attach(this)
        const json = this.props.controller.getJson()
        const file = this.props.controller.getFile()
        const filename = file === undefined ? '' : file.name
        this.state = {
            filename: filename,
            jsonContent: JSON.stringify(json, null, 2)
        }
    }

    componentWillUnmount() {
        this.props.controller.detach(this)
    }

    state = {
        filename: '',
        jsonContent: ''
    }

    update(): void { //invocata dal controller nel momento in cui viene letto il file json
        const json = this.props.controller.getJson()
        const file = this.props.controller.getFile()
        const filename = file === undefined ? '' : file.name
        this.setState({jsonContent: JSON.stringify(json, null, 2), filename: filename})
    }

    checkFile = (event: any) => {
        if (this.props.controller.getFile() !== undefined) {
            this.props.emitter.emit(AppEvents.alertWarning, ["Watch out! A file is already imported!"])
            //event.stopImmediatePropagation()
        }
    }

    render() {
        return (
            <PanelOptionsGrid>
                <PanelOptionsGroup title="Upload the File">
                    <VerticalGroup>
                        <div onClick={this.checkFile}>
                            <Files
                                className="files-dropzone"
                                onChange={(files: File[]) => {
                                    this.props.controller.setJson(files[files.length - 1])
                                }}
                                onError={(err: any) => console.log(err)}
                                accepts={[".json"]}
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                            >
                                <p>Drop files here or click to upload</p>
                                <p>File: {this.state.filename}</p>
                            </Files>
                        </div>
                    </VerticalGroup>
                </PanelOptionsGroup>
                <PanelOptionsGroup title="File contents">
                    <pre id='textarea'>{this.state.jsonContent}</pre>
                </PanelOptionsGroup>
            </PanelOptionsGrid>
        );
    }

}

export default CaricamentoJsonView;
