import Controller from "./controller/controller";

export interface Options {
    controller: Controller
}

export interface Predictor {
    name: string,
    value: number
}