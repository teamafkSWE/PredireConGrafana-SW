
import React, {PureComponent} from 'react';
import {PanelEditorProps} from "@grafana/data";
import {Simple} from "./ExampleRootPage";


interface MyPanelOptions {
    bitText:string;
}

class MyPanelEditor extends PureComponent<PanelEditorProps<MyPanelOptions>>{



    render() {


        return(

            <Simple/>

        );
    }
}

export default MyPanelEditor;