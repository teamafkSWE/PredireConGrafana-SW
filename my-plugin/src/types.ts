import Controller from "./controller/controller";

export interface Options {
    controller: Controller
}

export class Predictor {
    private readonly _name: string;
    private readonly _value: number;

    constructor(name: string, value: number) {
        this._name = name;
        this._value = value;
    }


    get name(): string {
        return this._name;
    }

    get value(): number {
        return this._value;
    }
}

export class Threshold {
    private _min: number
    private _max: number

    constructor(min: number, max: number) {
        this._min = min
        this._max = max
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value;
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value;
    }
}

export interface Connection {
    id: string,
    name: string,
    links: { predictor: string, query: string }[]
}