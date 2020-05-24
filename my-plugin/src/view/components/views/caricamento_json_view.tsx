import React, {PureComponent} from 'react';
import {HorizontalGroup, PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
import InsJson from "../input_json";

interface insJson {
    setData:(arg0:any,arg1:any,arg2:any,arg3:any)=>void
    jsonData: any | null
}
class CaricamentoJsonView extends PureComponent<insJson> {


    printJsonData=()=>{
        let data= this.props.jsonData;
        if(data.nameAlgorithm!==null){
            if(data.nameAlgorithm==="SVM") {
                return (<ul>
                        <li>
                            <p>Nome algoritmo : {data.nameAlgorithm}</p>
                        </li>
                        <li>
                            <p>Nome predittori : {data.predictors}</p>
                        </li>
                        <li>
                            <p>Coefficiente angolare(b) : {data.coefficienteAng}</p>
                        </li>
                        <li>
                            <p> Pesi(w): {data.firstVar}</p>
                        </li>
                    </ul>

                );
            }
            else {
                return (<ul>
                        <li>
                            <p>Nome algoritmo : {data.nameAlgorithm}</p>
                        </li>
                        <li>
                            <p>Nome predittori : {data.predictors}</p>
                        </li>
                        <li>
                            <p>Coefficiente angolare(b) : {data.coefficienteAng}</p>
                        </li>
                        <li>
                            <p> Intercetta(a): {data.firstVar}</p>
                        </li>
                    </ul>

                );
            }
        }
        return "Nessun JSON inserito";
    }

    render() {
        this.printJsonData();
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Inserimento file JSON">
                        <VerticalGroup>
                            <InsJson setData={this.props.setData}/>
                            <HorizontalGroup>
                                <p>or drag here</p>
                            </HorizontalGroup>

                        </VerticalGroup>

                    <h1>TO DO: </h1>
                        <ul>
                            <li>
                                <p>aggiungere componente per "drag and drop option".</p>
                            </li>
                        </ul>

                    </PanelOptionsGroup>
                    <PanelOptionsGroup title="Contenuto file JSON">
                        <p>{this.printJsonData()}</p>
                    </PanelOptionsGroup>


                </PanelOptionsGrid>

            </div>


        );
    }
}

export default CaricamentoJsonView;
