import {ClientOptions, InfluxDB, Point} from '@influxdata/influxdb-client'
import Axios from 'axios'

//docs: https://github.com/influxdata/influxdb-client-js/tree/master/examples
//singleton per il database

//TODO: set/get _retentionPolicy
//todo: add support for tags
class Influx {
    private static _instance: Influx | null = null;
    private static _clientOptions: ClientOptions | null = null
    private static _init = false;

    private readonly _IDB: InfluxDB;
    private _bucket: string;
    private _database: string = '';
    private _retentionPolicy: string = '';
    private _measurement: string = '';
    private _org: string = '';

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private constructor(CO: ClientOptions) {
        this._IDB = new InfluxDB(CO)
        this._bucket = `${this._database}/${(this._retentionPolicy)}`
    }

    /**
     *  @returns true if the connection has been accepted, false otherwise
     *  @param connectTo object containing the data used to connect to the database
     *  @return Promise<boolean>
     *  @throws {Error} when has already been initialized
     */
    public static async init(connectTo: { host: string, port: string | number, username?: string, password?: string }): Promise<boolean> {
        if (!this._init) {
            const {host, port} = connectTo;
            const username = connectTo.username ? connectTo.username : '';
            const password = connectTo.password ? connectTo.password : '';
            this._clientOptions = {
                url: `http://${host}:${port}`,
                token: `${username}:${password}`
            };


            //testo se l'host e la porta inseriti corrispondono all'url del database
            let res = await Axios.get(`${this._clientOptions.url}/ping`)
            if (200 <= res.status && res.status <= 299) {
                this._init = true;
                return true
            } else
                return false
        } else
            throw new Error('Trying to initialize when already initialized')
    }

    /**
     * @returns a new instance of the database
     * @throws {Error} when has not been initialized
     */
    public static getInstance(): Influx {
        if (Influx._instance !== null)
            return Influx._instance;
        else if (Influx._clientOptions !== null) {
            Influx._instance = new Influx(Influx._clientOptions)
            return Influx._instance
        } else
            throw new Error('Cannot instantiate a new instance, missing initialization.')
    }

    /**
     * @returns the database setted
     * @return string
     */
    get getDatabase(): string {
        return this._database;
    }

    /**
     * @returns the measurement setted
     * @return string
     */
    get getMeasurement(): string {
        return this._measurement;
    }

    /**
     * @returns the organization setted
     * @return string
     */
    get getOrg(): string {
        return this._org;
    }

    /**
     * set the database to be used
     * @param database
     */
    public useDatabase(database: string) {
        this._database = database
        this._bucket = `${this._database}/${(this._retentionPolicy)}`
        return this;
    }

    /**
     * set the measurement to write on
     * @param measurement
     */
    public setMeasurement(measurement: string) {
        this._measurement = measurement;
        return this;
    }

    /**
     * set the organization to be used
     * @param org
     */
    public setOrganization(org: string) {
        this._org = org;
        return this;
    }

    /**
     * write a point on the database with the passed value
     * the point is written in the measurement selected with setMeasurement(...)
     * @param value to write
     * @throws {Error} if a database or a measurement has not been selected
     * @return Promise<void>
     */
    public write(value: number) {
        if (this._database === '')
            throw new Error('No database setted.')
        if (this._measurement === '')
            throw new Error('No measurement setted.')

        const writeAPI = this._IDB.getWriteApi(this._org, this._bucket)
        const point = new Point(this._measurement)

            //.tag('host', 'host1')
            .floatField('value', value)
        writeAPI.writePoint(point)
        writeAPI.close().catch((e)=>console.error(e))
        return this.sleep(1500)
    }

    private _defaultSolver:Solver = {
        complete: (lines)=>{
            console.log(lines)},
        error: (err)=>{
            console.error(err)}
    }

    //todo: implementare test una volta visto se ne è necessario
    public query(solver: Solver = this._defaultSolver,endRange = '') {
        if (this._database === '')
            throw new Error('No database setted.')
        if (this._measurement === '')
            throw new Error('No measurement setted.')

        const fluxQuery = `from(bucket:"${this._bucket}")
                            |> range(start: -${endRange === '' ? '1h' : endRange}) 
                            |> filter(fn: (r) => r._measurement == "${this._measurement}")
                            |> sort(columns: ["time"], desc: false)`

        //const query = "select * from test"
        const queryAPI = this._IDB.getQueryApi(this._org)
        let lines: { time: any; value: any; }[] = []
        queryAPI.queryRows(
            fluxQuery,
            {
                error(error: Error) {
                    solver.error(error)
                },
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row)
                    const line = {
                        time: o._time,
                        value: o._value
                    }
                    lines.push(line)
                },
                complete() {
                    solver.complete(lines)
                },
            }
        )
    }
}

type Solver = {
    complete: ((arg0: { time: any; value: any; }[]) => void),
    error: ((arg0: Error) => void)
}


export default Influx;