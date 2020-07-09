import React, {Component} from "react";

class TextAreaNotes extends Component{

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
                <textarea className="input-group-text bg-dark border-dark text-lg-left text-white" value={this.props.notes} onChange={this.props.handleNotes} placeholder='Add notes to the JSON file' />
            </div>
        );
    }
}

export default TextAreaNotes;
