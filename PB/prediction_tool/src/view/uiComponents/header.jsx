import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="header mb-2">
                <h1 className="text-white text-center">Training Tool</h1>
                <h2 className="text-dark text-center"><small>make your data useful!</small></h2>
            </div>
        );
    }
}

export default Header;