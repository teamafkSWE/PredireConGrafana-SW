import React, {Component} from 'react';
import Button from "./button";


//tramite un tag si ottiene la direzione che si vuole (H, V)
class Buttons extends Component {

    state = {
        direction: this.props.dir,
        children: this.props.children
    }

    getClasses = () => {
        let classString = "d-flex justify-content-center "
        if (this.state.direction === "horizontal")
            classString += "flex-row";
        else if (this.state.direction === "vertical")
            classString += "flex-column";
        return classString;
    }

    render() {
        return(
        <div className={this.getClasses()}>
            {this.state.children.map( (entry, index) => {
                if (entry.type.name === "Buttons")
                    return <Buttons dir={entry.props.dir}>{entry.props.children}</Buttons>
                else
                    return <Button key={index}>{entry.props.children}</Button>
            } )}
        </div>
        );
    }
}

export default Buttons;