import {Predictor, Connection} from "../types";
import Observable from "./observable";
import Algorithm from "../model/algorithm";
import {Svm, SvmData} from "../model/algorithms/svm";
import {Regression, RLData} from "../model/algorithms/regression";
import {DataFrame, FieldType} from "@grafana/data";
//import React from 'react';

export default class Controller extends Observable {
    private _json: any;
    private _file: File | undefined;
    private _predictors: Predictor[] = [];
    private _b: number | undefined;
    private _algorithm: Algorithm | undefined;
    private _sogliaMin: number | undefined;
    private _sogliaMax: number | undefined;
    private _queries: DataFrame[] = []; //a che serve questo campo?
    private _connections: Connection[] = [];
    private _newConnectionIndex = 0; //attenzione, può solo incrementare, non credo vada bene
    private _isMonitoring: boolean = false;
    private _predictedData: { name: string, data: number[][] }[] = [];

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
                //todo: aggiungere controllo in caso il json caricato non contenga le informazioni a noi utili
                this._json = JSON.parse(event.target.result);
                this._definePredictors()
                this._setStrategy()
                this._b = this._json.result.b
                this.notifyAll()
            }
        }
        fr.readAsText(file)
        return this
    }

    public setSogliaMin = (valueSogliaMin: number) => {
        this._sogliaMin = valueSogliaMin;
    }

    public setSogliaMax = (valueSogliaMax: number) => {
        this._sogliaMax = valueSogliaMax;
    }

    public setListPredictorQuery = (obj: { name: string, list: { predictor: string, query: string }[] }) => {
        this._connections.push({id: this._newConnectionIndex.toString(), name: obj.name, queries: obj.list});
        this._newConnectionIndex++;
        this.notifyAll();
    }
    public editListPredictorQuery = (id:string ,obj: { name: string, list: { predictor: string, query: string }[] }) => {

        for (let i = 0; i < this._connections.length; i++) {
            if(this._connections[i].id===id){
                this._connections[i].name=obj.name;
                this._connections[i].queries=obj.list;
            }
        }
    }
    public removeListPredictorQuery = (id: string) => {
        for (let i = 0; i < this._connections.length; i++) {
            if (this._connections[i].id === id) {
                this._connections.splice(i, 1);
            }
        }
        this.notifyAll();
    }

    public handleSoglie = (sMin: number, sMax: number) => {
        if(sMin !== null && sMin.toString().length === 1)
            sMin = parseInt("0" + sMin)
        if(sMax !== null && sMax.toString().length === 1)
            sMax = parseInt("0" + sMax)
        if(sMin >= sMax || (sMin === 0 && sMax === 0)) {
            alert("SogliaMin non valida. Inserire un valore minore della sogliaMax.")
            return false
        }else{
            alert("Soglie inserite correttamente.")
        }
        return true
    }

    /*public handleInserimentoCollegamento = (bool: any) => {
        if(bool === true)
            return true
        else
            return false
    }*/
    /*
    public handleConfermaCollegamento = (bool: any) => {
        if (this.handleSoglie() && bool === true){
            alert("Collegamento confermato.")
            return true
        }else {
            if(!this.handleSoglie() && bool === true)
                alert("Soglie non impostate correttamente.")
            else if (this.handleSoglie() && bool === false)
                alert("Collegamento non inserito correttamente.")
            else
                alert("Inserire un collegamento ed impostare le relative soglie.")
            return false
        }
    }*/

    public setQueries = (queries: DataFrame[]) => {
        this._queries = queries;
    }

    public updatePredictions = (series: DataFrame[]) => {
        //console.log('updating predictions')
        for (let connection of this._connections) { //calcolo la previsione per ogni collegamento
            //console.log('connection name', connection.name)
            //console.log('connection', connection)
            const inputs: number[] = [] //array usato per calcolare la predizione
            for (let query of series) {
                //console.log('query', query)
                const queries: string[] = [] //array che contiene tutti i nomi delle query per questo collegamento
                connection.queries.forEach(ele => queries.push(ele.query))
                //console.log('queries selected', queries)
                if (queries.includes(query.name as string)) {// questa query serve al calcolo della previsione
                    if (query.fields[0].type === FieldType.number) {
                        //console.log('found a number query')
                        let i = query.fields[0].values.length - 1
                        while (query.fields[0].values.get(i) == null && i > 0) {
                            i--
                        }
                        //console.log(query,i)
                        inputs.push(query.fields[0].values.get(i)) //inserisco il primo valore non nullo
                        //console.log(inputs);
                        //console.log(inputs[inputs.length-1])
                    }
                }
            }
            //console.log('input length', inputs.length)
            if (inputs.length === 0)
                return; //se non sono stati inseriti input allora non sono state impostate correttamente i predittori

            const predicted = this.getPrediction(inputs)
            //console.log('predicted value', predicted)
            if (predicted === null) // se non è stato possibilie calcolare la previzione allora non ha senso continuare
                return;

            let time: number = 0 //timestamp da associare alla predizione
            for (let ele of series[0].fields){
                if (ele.type === FieldType.time) {
                    //appena trovo una serie che contiene gli orari mi fermo (si potrebbe farlo continuare ma secondo me non è sicuro)
                    time = ele.values.get(ele.values.length - 1) //inserisco l'ultimo orario (che dovrebbe essere quello della previsione)
                    //console.log('time found', time)
                    break
                }
            }
            let data = [time, predicted]
            //console.log('data to be written in panel', data)
            let inserted = false
            for (let serie of this._predictedData){
                if (serie.name === connection.name){
                    serie.data.push(data)
                    //console.log('data pushed to an already existing connection')
                    inserted = true
                }
            }
            if (!inserted)
                this._predictedData.push({name:connection.name, data:[data]})
            //console.log('created a new serie of data')
        }
        //console.log('update finished')
    }


    /*  non credo sia una funzione utile

        public setController = (queries: DataFrame[], valueSogliaMin: number, valueSogliaMax: number,) =>{
            this.setQueries(queries);
            this.setSogliaMax(valueSogliaMin);
            this.setSogliaMin(valueSogliaMax);
        }
    */

    //potrebbe essere un metodo privato, ma forse è meglio lasciarlo pubblico
    public getPrediction = (inputs: number[]) => {
        if (this._algorithm !== undefined)
            return this._algorithm.predict(inputs);
        return null
    }

    public getPredictedData = (connectionName: string): number[][] => {
        let data: number[][] = [];
        this._predictedData.forEach(ele => {
            if (ele.name === connectionName) {
                data = ele.data;
                return
            }
        })
        return data;
    }

    public getConnections = () => {
        return this._connections;
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

    public getSogliaMin = () => {
        return this._sogliaMin;
    }

    public getSogliaMax = () => {
        return this._sogliaMax;
    }

    public getQueries = () => {
        return this._queries;
    }

    public getB = () => {
        return this._b
    }

    public isMonitoring = () => {
        return this._isMonitoring
    }

    public startMonitoring = () => {
        this._isMonitoring = true
        this.notifyAll()
    }

    public stopMonitoring = () => {
        this._isMonitoring = false
        this.notifyAll()
    }
}

