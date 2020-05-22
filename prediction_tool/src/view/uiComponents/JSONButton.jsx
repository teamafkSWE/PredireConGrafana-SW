import React, {Component} from 'react';


class JSONButton extends Component {

    render() {
        return (
            <React.Fragment>
                <button  onClick={this.props.json} className="btn btn-dark">Download</button>
            </React.Fragment>
        );
    }
}

export default JSONButton;