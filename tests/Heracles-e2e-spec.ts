import {Hydra as client} from '../src';

const mockApiBase = 'http://localhost:8080';

describe('Hydra (e2e)', () => {
    let originalTimeout;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should directly expose all resource from graph', async () => {
        // given
        const slice = 'http://stat.stadt-zuerich.ch/api/dataset/GEB-RAUM-ZEIT/slice';
        const representation = await client.loadResource(slice);

        // when
        const resource = representation.get('http://ld.stadt-zuerich.ch/statistics/code/R00014');

        // then
        expect(resource.id).toBe('http://ld.stadt-zuerich.ch/statistics/code/R00014');
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
