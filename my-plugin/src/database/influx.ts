import {ClientOptions, InfluxDB, Point} from '@influxdata/influxdb-client'

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
            let res = await fetch(`${this._clientOptions.url}/ping`)
            if (res.ok){
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
    public static getInstance(){
        if (this._instance !== null)
            return this._instance;
        else if (this._clientOptions !== null){
            this._instance = new Influx(this._clientOptions)
            return this._instance
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
     * set the database to be used
     * @param database
     */
    public useDatabase(database:string){
        this._database = database
        this._bucket = `${this._database}/${(this._retentionPolicy)}`
    }

/*
    public setMeasurement(measurement: string) {
        this._measurement = measurement;
        return this;
    }
*/
    /**
     * write a point on the database with the value passed
     * @param value
     */
    public write(value: number) {
        //todo: setup org on getWriteApi
        const writeAPI = this._IDB.getWriteApi('', this._bucket)
        const point = new Point('cpu')
            //.tag('host', 'host1')
            .floatField('value', value)
        writeAPI.writePoint(point)
        writeAPI
            .close()
            .then(() => console.log('FINISHED'))
            .catch(error => {
                console.error(error)
            })

    }
/*
    //TODO: add query method
    public query(){
        return this._IDB.query(`select * from ${this._measurement}`)
    }
 */
}


export default Influx;