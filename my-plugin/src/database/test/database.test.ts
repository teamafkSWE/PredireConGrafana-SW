import Influx from '../influx'
import {enableFetchMocks} from 'jest-fetch-mock'

enableFetchMocks()

test('Influx init', async () => {
    const init = await Influx.init({
        port: 8086,
        host: 'localhost'
    })
    expect(init).toBe(true);
    expect(init).not.toBe(false);
});

//TODO: add more tests