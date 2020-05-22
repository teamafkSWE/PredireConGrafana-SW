import Influx from '../influx'

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
    test('set database',()=>{
        const database = 'mydb';
        instance.useDatabase(database)
        expect(instance.getDatabase).toStrictEqual(database)
    })
    test('write - measurement Error', () => {
        expect(() => instance.write(0)).toThrowError(Error('No measurement setted.'))
    })
    test('set measurement',() =>{
        const measurement = 'cpu'
        instance.setMeasurement(measurement)
        expect(instance.getMeasurement).toStrictEqual(measurement)
    })
})