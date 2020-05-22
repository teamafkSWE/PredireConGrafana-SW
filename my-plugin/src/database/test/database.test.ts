import Influx from '../influx'
import {enableFetchMocks} from 'jest-fetch-mock'

enableFetchMocks()
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
//TODO: add more tests