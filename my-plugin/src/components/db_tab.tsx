import React, {PureComponent} from 'react';
import {DataFrame} from '@grafana/data';
import {VerticalGroup, HorizontalGroup} from "@grafana/ui";

interface props {
    queries: DataFrame[]
    json: {
        "predictor": string[],
        "result": {
            "b": number,
            "a": number[]
        }
    } | null
}

class Db_tab extends PureComponent<props> {

    getOptions = () => {
        const queries = this.props.queries;
        if (queries.length > 0) {
            return <>{queries.map((query) => <option value={query.name}>{query.name}</option>)}</>
        } else
            return <option value="noQ">No query found</option>
    }

    getPredictors = (json: { "predictor": string[], "result": { "b": number, "a": number[] } }) => {
        return <>{json.predictor.map((pred, index) => <option value={index}>{pred}</option>)}</>
    }

    render() {
        const {json} = this.props;
        return (
            <>
                <VerticalGroup>
                    <HorizontalGroup>
                        <label htmlFor="queries">Select query:</label>
                        <select id="queries">
                            {this.getOptions()}
                        </select>
                    </HorizontalGroup>
                    <HorizontalGroup>
                        {json && <>
                            <label htmlFor="predictors">Select predictors:</label>
                            <select id="predictors">
                                {this.getPredictors(json)}
                            </select>
                        </>}
                    </HorizontalGroup>
                </VerticalGroup>
            </>
        );
    }
}

export default Db_tab;



