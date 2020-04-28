import React, {CSSProperties, PureComponent} from 'react';

interface Props {
    active: string | undefined;
}

const ACTIVE:CSSProperties = {
    display: "unset"
}
const HIDDEN:CSSProperties = {
    display: "none"
}

class TabB extends PureComponent<Props>{
    getActive(): CSSProperties{
        if (this.props.active === 'B')
            return ACTIVE;
        else
            return HIDDEN
    }

    render() {
        return (
            <h1 style={this.getActive()}>Dati:</h1>
        );
    }
}

export default TabB;
