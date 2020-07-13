import React, {Component} from 'react';

class Information extends Component {

    render() {
        return (
            <div id="info">
                <h2>How To Use:</h2>
                <p>
                    asfhasjfhaskhfkajsfh asjf hasjh jas asjk aksj da
                </p>
                <p>sa dnasjhdaskjhhkdjkash kashdjkahs akj asdd.</p>
                <p>contacts: email.....</p>
                <button className="btn btn-dark" onClick={this.props.setShowFalse}>Close</button>
            </div>
        );
    }
}

export default Information;