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

export class Datasource {
    private readonly _id: number
    private readonly _database: string;
    private readonly _name: string
    private readonly _url: string


    constructor(id: number, database: string, name: string, url: string) {
        this._id = id;
        this._database = database;
        this._name = name;
        this._url = url;
    }


    get id(): number {
        return this._id;
    }

    get database(): string {
        return this._database;
    }

    get name(): string {
        return this._name;
    }

    get url(): string {
        return this._url;
    }
}