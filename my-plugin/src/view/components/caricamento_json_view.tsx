import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import Files from "react-files";
import Observer from "./observer/observer";
import Controller from "../../controller/controller";

interface Props {
    controller: Controller
}

class CaricamentoJsonView extends PureComponent<Props> implements Observer{

    constructor(props: Readonly<Props>) {
        super(props);
        props.controller.attach(this)
        const json = this.props.controller.getJson()
        const file = this.props.controller.getFile()
        const filename = file === undefined ? '':file.name
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

    update(): void {
        const json = this.props.controller.getJson()
        const file = this.props.controller.getFile()
        const filename = file === undefined ? '':file.name
        this.setState({jsonContent: JSON.stringify(json, null, 2), filename: filename})
    }

    render() {
        //const file = this.props.controller.getFile()
        //const filename = file === undefined ? '':file.name
        console.log(this.state)
        return (
            <PanelOptionsGrid>
                <PanelOptionsGroup title="Inserimento file JSON">
                    <VerticalGroup>
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
                    </VerticalGroup>

                </PanelOptionsGroup>
                <PanelOptionsGroup title="Contenuto file JSON">
                    <pre id='textarea'>{this.state.jsonContent}</pre>
                </PanelOptionsGroup>
            </PanelOptionsGrid>
        );
    }

}

export default CaricamentoJsonView;
