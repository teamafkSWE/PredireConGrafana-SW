import React, {Component} from 'react';
import CSVReader from 'react-csv-reader';

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
            <form className="text-center">
                <fieldset>
                    <CSVReader onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)} />
                </fieldset>
            </form>
        );
    }
}

export default InputComponent;