import React, {Component} from 'react';

class Information extends Component {

    render() {
        return (
            <div id="info">
                <h2>How To Use</h2>
                <p>
                    <ol>
                        <li>Select the CSV file</li>
                        <li>Select the algorithm</li>
                        <li>Start training</li>
                        <li>If you want, you can add notes to your file or change the name of the latter</li>
                        <li>Download the JSON file</li>
                    </ol>
                </p>
                <button className="btn btn-dark" id="closeBtn" onClick={this.props.setShowFalse}>Close</button>
                <div id="bugs">
                    <h3>Did you find any bug? Contact us!</h3>
                    <p>Send an email to: <br />
                    <a href="mailto:gruppoafk15@gmail.com">gruppoafk15@gmail.com </a> </p>
                </div>

            </div>
        );
    }
}

export default Information;