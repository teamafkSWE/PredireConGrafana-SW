import React, { Component } from "react";


//button con la b minuscola è già un componente html
class Button extends Component{

    render() {
        return (
            <button className="ml-auto mr-auto mt-2 mb-2 btn btn-dark btn-lg align-self-start">
                {this.props.children}
            </button>);
    }
}

export default Button