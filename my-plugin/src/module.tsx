import {PanelPlugin} from '@grafana/data';
import Editor from './view/EditorPanel'
import Controller from "./controller/controller";
import Panel from "./view/panel";


export const plugin = new PanelPlugin(Panel);
plugin.setEditor(Editor);
plugin.setDefaults({
    controller: new Controller()
})

