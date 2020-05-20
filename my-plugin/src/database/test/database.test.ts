import Influx from '../influx'


test('Influx connection', async () => {
    const db = await Influx.getInstance({
        database: "mydb",
        host: "localhost",
        port: "8086"
    })
    expect(db).not.toBe(false);
});

//TODO: add more tests