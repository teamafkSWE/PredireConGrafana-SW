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

export class Connection {
    // id: string,
    // name: string,
    // links: { predictor: string, query: string }[]

    private _id: string
    private _name: string
    private _links: { predictor: string, query: string }[]


    constructor(id: string, name: string, links: { predictor: string; query: string }[]) {
        this._id = id;
        this._name = name;
        this._links = links;
    }


    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get links(): { predictor: string; query: string }[] {
        return this._links;
    }

    set id(value: string) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set links(value: { predictor: string; query: string }[]) {
        this._links = value;
    }
}

export class Datasource {
    private readonly _id: string
    private readonly _database: string;
    private readonly _name: string
    private readonly _url: string
    private readonly _user: string
    private readonly _password: string


    constructor(id: string, database: string, name: string, url: string, user: string, password: string) {
        this._id = id.toString();
        this._database = database;
        this._name = name;
        this._url = url;
        this._user = user
        this._password = password
    }

    get user(): string {
        return this._user;
    }

    get password(): string {
        return this._password;
    }

    get id(): string {
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