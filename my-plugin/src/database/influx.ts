import {InfluxDB, IPoint} from 'influx'

//docs: https://node-influx.github.io/class/src/index.js~InfluxDB.html#instance-constructor-constructor
//facade per il database(?)
//TODO: add methods
class Influx {

    private _measurement: string | null;
    private readonly _IDB: InfluxDB

    //private _database: string

    public static async getInstance(connectTo: { host: string, port: string, username?: string, password?: string, database: string,}) {
        //ottengo i parametri
        const {host, port, database} = connectTo;
        const username = connectTo.username ? connectTo.username : '';
        const password = connectTo.password ? connectTo.password : '';
        const uri = `${host}:${port}`;
        const token = `${username}:${password}`;
        const url = `http://${token}@${uri}/${database}`;
        const res = await (new InfluxDB(url)).ping(1000)
        if (res[0].online)
            return new this(url, database)
        else
            return false
    }

    private constructor(url: string, database: string) {
        this._IDB = new InfluxDB(url);
        //this._database = database;
        this._measurement = null;
    }

/*
    public setDatabase(db: string) {
        this._database = db;
        return this;
    }

*/

    public setMeasurement(measurement: string) {
        this._measurement = measurement;
        return this;
    }

    //TODO: do better
    public write(value: number) {
        if (this._measurement === null) {
            throw Error("Measurement not selected")
        }

        const point:IPoint = {
            fields: {value: value}
        }

        this._IDB.writeMeasurement(this._measurement, [point])
    }

    //TODO: add query method
}


export default Influx;