import React, {Component} from 'react';


/*
 * Di default <input> prende un solo file
 * mentre <input multiple> permette di prendere più file
 */

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    getFileName = () => {
        if (this.props.fileName === "")
            return "Nessun file Selezionato";
        else
            return this.props.fileName;
    }

    render() {
        return (
            <form>
                <fieldset>
                    <legend className="d-none">File</legend>
                    <label className="btn btn-dark" htmlFor="fIn">Seleziona File</label>
                    <input className="d-none" id="fIn" type="file" onChange={() => this.props.onFileInput(this.fileInput.current.files)} ref={this.fileInput} accept=".csv"/>
                    <p>File: {this.getFileName()}</p>
                    <button type="submit" className="btn btn-lg btn-dark">Conferma</button>
                </fieldset>
            </form>
        );
    }
}

export default InputComponent;