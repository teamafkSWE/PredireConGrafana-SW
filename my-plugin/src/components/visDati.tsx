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

class VisDati extends PureComponent<Props>{
    getActive(): CSSProperties{
        if (this.props.active === 'visDati')
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

export default VisDati;
