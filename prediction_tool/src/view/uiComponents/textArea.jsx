import React, {Component} from "react";

class TextAreaNotes extends Component{

    render() {
        return(
            <div>
                <textarea  id={"textArea"} className="w-100 p-3 bg-dark border-dark text-white" value={this.props.notes} onChange={this.props.handleNotes} placeholder='Add notes to the JSON file' />
            </div>
        );
    }
}

export default TextAreaNotes;
