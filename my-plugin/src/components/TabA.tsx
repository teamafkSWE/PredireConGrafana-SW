import React, {PureComponent, CSSProperties} from 'react';

interface Props {
    active: string | undefined;
}

const ACTIVE:CSSProperties = {
    display: "unset"
}
const HIDDEN:CSSProperties = {
    display: "none"
}

class TabA extends PureComponent<Props> {

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
