import {Predictor} from "../types";
import Observable from "./observable";
import Algorithm from "../model/algorithm";
import {Svm, SvmData} from "../model/algorithms/svm";
import {Regression, RLData} from "../model/algorithms/regression";

// Prova per alessandro

export default class Controller extends Observable {
    private _json: any
    private _file: File | undefined
    private _predictors: Predictor[] = []
    private _b: number | undefined;
    private _algorithm: Algorithm | undefined;

    private _definePredictors = () => {
        this._predictors = [];
        const rawPredictors = this._json.predictors
        const rawValues = this._json.result
        const predictorsNames: string[] = []
        const predictorsValues: number[] = []
        if (this._json.algorithm === "Linear Regression") {
            rawPredictors.a.forEach((name: string) => predictorsNames.push(name))
            rawValues.a.forEach((value: number) => predictorsValues.push(value))
        } else if (this._json.algorithm === "SVM") {
            rawPredictors.w.forEach((name: string) => predictorsNames.push(name))
            rawValues.w.forEach((value: number) => predictorsValues.push(value))
        }

        for (let i = 0; i < predictorsNames.length; i++) {
            this._predictors.push({name: predictorsNames[i], value: predictorsValues[i]})
        }
    }

    private _setStrategy() {
        const algorithm: string = this._json.algorithm
        if (algorithm === 'Linear Regression') {
            const data: RLData = {
                a: this._json.result.a,
                b: this._json.result.b
            }
            this._algorithm = new Regression(data);
        } else if (algorithm === 'SVM') {
            const data: SvmData = {
                wheits: this._json.result.w,
                bias: this._json.result.b
            }
            this._algorithm = new Svm(data);
        }
    }

    public setJson = (file: any) => {
        this._file = file
        const fr = new FileReader()
        fr.onload = (event) => {
            if (event.target !== null && typeof event.target.result === "string") {
                this._json = JSON.parse(event.target.result);
                this._definePredictors()
                this._setStrategy()
                this._b = this._json.result.b
                this.notifyAll()
            }
        }
        fr.readAsText(file);
        return this
    }

    public getFile = () => {
        return this._file
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

    public getPrediction = (inputs: number[]) => {
        if (this._algorithm !== undefined)
            return this._algorithm.predict(inputs);
        return
    }
}

