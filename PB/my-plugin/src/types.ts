import Controller from "./controller/controller";

export interface Options {
    controller: Controller
}

export interface Predictor {
    name: string,
    value: number
}

export interface Connection {
    id: string,
    name: string,
    queries: { predictor: string, query: string }[]
}