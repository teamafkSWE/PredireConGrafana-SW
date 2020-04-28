import React, {PureComponent, CSSProperties} from 'react';

//definisco quali props deve ricevere la classe
interface Props {
    active: string | undefined;
}

//definisco due proprietà css ACTIVE & HIDDEN
const ACTIVE:CSSProperties = {
    display: "unset"
}
const HIDDEN:CSSProperties = {
    display: "none"
}

class TabA extends PureComponent<Props> {

    //controllo se devo essere visibile o nascosto
    getActive(): CSSProperties{
        if (this.props.active === 'A')
            return ACTIVE;
        else
            return HIDDEN
    }

    render() {
        return (
            <h1 style={this.getActive()}>Inserisci JSON:</h1>
        );
    }
}

export default TabA;
