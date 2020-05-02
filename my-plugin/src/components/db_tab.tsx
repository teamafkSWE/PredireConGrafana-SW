import React, { PureComponent} from 'react';
import { DataFrame } from '@grafana/data';

interface props {
    queries: DataFrame[]
}

class Db_tab extends PureComponent<props>{

    getOptions = () => {
        const queries = this.props.queries;
        if ( queries.length> 0){
            return <>{queries.map((query) => <option value={query.name}>{query.name}</option>)}</>
        }else
            return <option value="noQ">No query found</option>
    }

    render() {
        return (
            <>
                <label htmlFor="queries">Select query:</label>
                <select id="queries">
                    {this.getOptions()}
                </select>
            </>
        );
    }
}

export default Db_tab;



