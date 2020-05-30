import {Predictor} from "../types";


export default class Controller {
    private _json: any
    private readonly _predictors:Predictor[] = []
    private _b: number | undefined;

    private _definePredictors = () => {
        const rawPredictors = this._json.predictors
        const rawValues = this._json.result
        const predictorsNames:string[] = []
        const predictorsValues:number[] = []
        if (this._json.algorithm === "Linear Regression"){
            rawPredictors.a.forEach((name: string) => predictorsNames.push(name))
            rawValues.a.forEach((value: number) => predictorsValues.push(value))
        }
        else if (this._json.algorithm === "SVM"){
            rawPredictors.w.forEach((name: string) => predictorsNames.push(name))
            rawValues.w.forEach((value: number) => predictorsValues.push(value))
        }

        for (let i = 0; i < predictorsNames.length; i++){
            this._predictors.push({name: predictorsNames[i], value: predictorsValues[i]})
        }
    }

    public setJson = (file: any) => {
        const fr = new FileReader()
        fr.onload = (event) => {
            if (event.target !== null && typeof event.target.result === "string") {
                this._json = JSON.parse(event.target.result);
                this._definePredictors()
                this._b = this._json.result.b
            }
        }
        fr.readAsText(file);
        return this
    }

    public getJson = () => {
        return this._json
    }

    public getPredictors = () => {
        return this._predictors
    }

    public getB = () => {
        return this._b
    }
}

