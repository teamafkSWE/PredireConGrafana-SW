import {Predictor} from "../types";


export default class Controller {
    private _json: any
    private readonly _predictors:Predictor[] = []

    public setJson(file: any){
        const fr = new FileReader()
        fr.onload = (event) => {
            if (event.target !== null && typeof event.target.result === "string") {
                this._json = JSON.parse(event.target.result);
            }
        }
        fr.readAsText(file);
        return this
    }


    get json(){
        return this._json
    }

    get predictors():Predictor[]{
        return this._predictors
    }
}

