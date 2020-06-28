import Influx from '../influx'
import Axios from "axios";

test('connection', async () => {
    expect.assertions(1)
    const influx = await Influx.connect('http://localhost:8086')
    expect(influx).not.toBe(null)
})
/*
describe('influx', () => {
    let influx: Influx | null = null
    Influx.connect('http://localhost:8086')
        .then(ifx => {
            influx = ifx;
            //console.log(influx)
        })

    test('set database', () => {
        expect.assertions(1)
        const database = 'mydb';


        if (influx != null) {
            influx.useDatabase(database)
            expect(influx.getDatabase()).toStrictEqual(database)
        }
    })
    test('set measurement', () => {
        expect.assertions(1)
        const measurement = 'test'

        //console.log(influx)
        if (influx != null) {
            influx.setMeasurement(measurement)
            expect(influx.getMeasurement).toStrictEqual(measurement)
        }
    })
    test('write - database Error', () => {
        expect.assertions(1)

        if (influx != null)
            expect(() => {
                if (influx != null) influx.write(0)
            }).toThrowError(Error('No database setted.'))

    })
    test('write - measurement Error', () => {
        expect.assertions(1)

        if (influx != null) {
            influx.useDatabase('mydb')
            expect(() => {
                if (influx != null) influx.write(0)
            }).toThrowError(Error('No measurement setted.'))
        }
    })
    test('write - no error', (done) => {
        expect.assertions(1)
        const value = Math.random()

        if (influx != null) {
            influx.useDatabase('mydb')
            influx.setMeasurement('test')
            influx.write(value).then(() => {
                Axios.get('http://localhost:8086/query?db=mydb&q=select%20*%20from%20test%20order%20by%20time%20desc')
                    .then((response) => {
                        const result = response.data.results[0].series[0].values[0][1]
                        expect(result).toStrictEqual(value)
                        done()
                    })
            })
        }
    })


})*/


test('set database', async () => {
    expect.assertions(1)
    const database = 'mydb';
    const influx = await Influx.connect('http://localhost:8086')
    //.then(influx => {
    //console.log(influx)
    if (influx != null) {
        influx.useDatabase(database)
        expect(influx.getDatabase()).toStrictEqual(database)
    }
    //})
})
test('set measurement', async () => {
    expect.assertions(1)
    const measurement = 'test'
    const influx = await Influx.connect('http://localhost:8086')
    //.then(influx => {
    //console.log(influx)
    if (influx != null) {
        influx.setMeasurement(measurement)
        expect(influx.getMeasurement()).toStrictEqual(measurement)
    }
    //})
})
test('write - database Error', async () => {
    expect.assertions(1)
    const influx = await Influx.connect('http://localhost:8086')
    //.then(influx => {
    if (influx != null)
        expect(() => influx.write(0)).toThrowError(Error('No database setted.'))
    // })
})
test('write - measurement Error', async () => {
    expect.assertions(1)
    const influx = await Influx.connect('http://localhost:8086')
    //.then(influx => {
    if (influx != null) {
        influx.useDatabase('mydb')
        expect(() => influx.write(0)).toThrowError(Error('No measurement setted.'))
    }
    // })
})
test('write - no error', (done) => {
    expect.assertions(1)
    const value = Math.random()
    Influx.connect('http://localhost:8086')
        .then(influx => {
            //console.log(influx)
            if (influx != null) {
                influx.useDatabase('mydb')
                influx.setMeasurement('test')
                influx.write(value).then(() => {
                    Axios.get('http://localhost:8086/query?db=mydb&q=select%20*%20from%20test%20order%20by%20time%20desc')
                        .then((response) => {
                            const result = response.data.results[0].series[0].values[0][1]
                            //console.log(value,result)
                            expect(result).toStrictEqual(value)
                            done()
                        })
                })
            }
        })
})


/*
test('Influx no init', () => {
    expect(Influx.getInstance).toThrowError()
})

describe('Influx init', () => {
    test('Init no problem', async () => {
        const init = await Influx.init({
            port: 8086,
            host: 'localhost'
        })
        expect(init).toStrictEqual(true);
        expect(init).not.toStrictEqual(false);

    });
    test('Init throws error', () => {
        expect.assertions(1)
        Influx.init({host: '', port: ''}).catch(e => expect(e).toStrictEqual(Error('Trying to initialize when already initialized')))
    })
});

describe('Influx operations', () => {
    let instance: Influx;
    test('get instance', () => {
        expect(Influx.getInstance).not.toThrowError()
    })
    test('write - database Error', () => {
        instance = Influx.getInstance()
        expect(() => instance.write(0)).toThrowError(Error('No database setted.'))
    })
    test('set database', () => {
        const database = 'mydb';
        instance.useDatabase(database)
        expect(instance.getDatabase).toStrictEqual(database)
    })
    test('write - measurement Error', () => {
        expect(() => instance.write(0)).toThrowError(Error('No measurement setted.'))
    })
    test('set measurement', () => {
        const measurement = 'test'
        instance.setMeasurement(measurement)
        expect(instance.getMeasurement).toStrictEqual(measurement)
    })
    test('write - no error', (done) => {
        expect.assertions(1)
        const value = Math.random()
        instance.write(value).then(() => {
            Axios.get('http://localhost:8086/query?db=mydb&q=select%20*%20from%20test%20order%20by%20time%20desc')
                .then((response) => {
                    const result = response.data.results[0].series[0].values[0][1]
                    expect(result).toStrictEqual(value)
                    done()
                })
        })
    })
})*/