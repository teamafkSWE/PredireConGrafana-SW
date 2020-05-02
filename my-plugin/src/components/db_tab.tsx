import React, { PureComponent} from 'react';
import Axios from 'axios'

class Db_tab extends PureComponent{

    constructor(props: Readonly<{}>) {
        super(props);
        this.getDataAxios()
    }

    async getDataAxios(){
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        const hostUrl = `${protocol}//${hostname}:${port}`;

        const response = await Axios.get(`${hostUrl}/api/datasources`);
        console.log(response);
    }

    render() {
        return (
            <h1>Dati:</h1>
        );
    }
}

export default Db_tab;



