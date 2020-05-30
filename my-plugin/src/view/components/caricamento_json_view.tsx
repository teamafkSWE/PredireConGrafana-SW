import React, {PureComponent} from 'react';
import {PanelOptionsGrid, PanelOptionsGroup, VerticalGroup} from "@grafana/ui";
//import InsJson from "../input_json";
import Files from "react-files";

interface insJson {
    setJson:(json:any)=>any
}
class CaricamentoJsonView extends PureComponent<insJson> {

/*
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


*/
    render() {
        return (
            <div>
                <PanelOptionsGrid>
                    <PanelOptionsGroup title="Inserimento file JSON">
                        <VerticalGroup>
                            {/*<InsJson setData={this.props.setData}/>*/}
                            <Files
                                className="files-dropzone"
                                onChange={(file: any[]) =>
                                    this.props.setJson(file[file.length-1])}
                                onError={(err: any) => console.log(err)}
                                accepts={[".json"]}
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                            >
                                {/*<button  className='btn btn-secondary btn-sm'>Insert file</button>*/}
                                Drop files here or click to upload
                            </Files>
                        </VerticalGroup>

                    </PanelOptionsGroup>
                    <PanelOptionsGroup title="Contenuto file JSON">
                        <p>{/*this.printJsonData()*/}</p>
                    </PanelOptionsGroup>


                </PanelOptionsGrid>

            </div>


        );
    }
}

export default CaricamentoJsonView;
