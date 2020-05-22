import Influx from '../influx'
import {enableFetchMocks} from 'jest-fetch-mock'

enableFetchMocks()
describe('Influx init', () => {
    test('Init no problem', async () => {
        const init = await Influx.init({
            port: 8086,
            host: 'localhost'
        })
        expect(init).toBe(true);
        expect(init).not.toBe(false);
    });
    test('Init throws error', () => {
        expect(Influx.init({
            port: 8086,
            host: 'localhost'
        })).toThrowError()
    })
});
//TODO: add more tests