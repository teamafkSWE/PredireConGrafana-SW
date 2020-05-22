import {ClientOptions, InfluxDB, Point} from '@influxdata/influxdb-client'
import Axios from 'axios'

//docs: https://github.com/influxdata/influxdb-client-js/tree/master/examples
//singleton per il database

//TODO: add methods
class Influx {
    private static _instance:Influx|null = null;
    private static _clientOptions:ClientOptions|null = null
    private static _init = false;

    private readonly _IDB: InfluxDB;
    private _bucket: string;
    private _database: string = '';
    private _retentionPolicy: string = '';
    private _measurement:string = '';
    private _org:string = '';

    /**
     *  @returns true if the connection has been accepted, false otherwise
     *  @param connectTo object
     *  @return Promise<boolean>
     *  @throws {Error} when has already been initialized
     */
    public static async init(connectTo: { host: string, port: string|number, username?: string, password?: string }):Promise<boolean> {
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
            if (200 <= res.status && res.status <= 299){
                this._init = true;
                return true
            }else
                return false
        } else
            throw new Error('Trying to initialize when already initialized')
    }

    /**
     * @returns a new instance of the database
     * @throws {Error} when has not been initialized
     */
    public static getInstance():Influx{
        if (Influx._instance !== null)
            return Influx._instance;
        else if (Influx._clientOptions !== null){
            Influx._instance = new Influx(Influx._clientOptions)
            return Influx._instance
        }
        else
            throw new Error('Cannot instantiate a new instance, missing initialization.')
    }

    private constructor(CO:ClientOptions) {
        this._IDB = new InfluxDB(CO)
        //todo: setup bucket
        this._bucket = `${this._database}/${(this._retentionPolicy)}`
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
    public useDatabase(database:string){
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
    public setOrganization(org:string){
        this._org = org;
        return this;
    }

    /**
     * write a point on the database with the passed value
     * @param value
     * @throws {Error} if a database or a measurement has not been selected
     */
    public write(value: number) {
        if (this._database === '')
            throw new Error('No database setted.')
        if (this._measurement === '')
            throw new Error('No measurement setted.')

        const writeAPI = this._IDB.getWriteApi(this._org, this._bucket)
        const point = new Point(this._measurement)
            //todo: add support for tags
            //.tag('host', 'host1')
            .floatField('value', value)
        writeAPI.writePoint(point)
        writeAPI.close()
    }
/*
    //TODO: add query method
    public query(){
        return this._IDB.query(`select * from ${this._measurement}`)
    }
 */
}


export default Influx;