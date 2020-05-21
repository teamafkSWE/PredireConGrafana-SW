import React, {Component} from 'react';


class ComboBoxAlgorithm extends Component {

    render() {
        
        return (
            <React.Fragment>
                <select id="algo" className="btn btn-dark" onChange={this.props.changeValue} value={this.props.value}>
                    <option>Seleziona l'algoritmo:</option>
                    <option value="svm">Support Vector Machine</option>
                    <option value="rl">Regressione Lineare</option>
                </select>
            </React.Fragment>
        );
    }
}

export default ComboBoxAlgorithm;