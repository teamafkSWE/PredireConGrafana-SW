import React, {Component} from "react";

class TextAreaFileName extends Component{

    /*constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Note inserted. ');
        event.preventDefault();
    }*/

    render() {
        return(<div>
                <input type="text" className="input-group-text bg-dark border-dark text-lg-left text-white" value={this.props.changeName} onChange={this.props.handleName} placeholder='Set JSON file name' />
            </div>
        );
    }
}

export default TextAreaFileName;
