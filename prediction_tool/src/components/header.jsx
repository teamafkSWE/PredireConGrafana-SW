import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="header mb-2">
                <h1 className="text-white text-center">Prediction Tool</h1>
                <h2 className="text-dark text-center"><small>get your prediction here!</small></h2>
            </div>
        );
    }
}

export default Header;