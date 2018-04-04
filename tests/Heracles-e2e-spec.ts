import {Alcaeus} from '../src/alcaeus';
import {async} from './test-utils';

const client = new Alcaeus();
const mockApiBase = 'http://localhost:8080';

describe('Hydra (e2e)', () => {
    async(it,'should directly expose all resource from graph', async () => {
        // given
        const representation = await client.loadResource(`${mockApiBase}/observations.json`);

        // when
        const resource = representation.get('http://ld.stadt-zuerich.ch/statistics/code/R00014');

        // then
        expect(resource.id).toBe('http://ld.stadt-zuerich.ch/statistics/code/R00014');
    });
});
