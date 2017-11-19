import { entries } from 'core-js/es7/object';
import {ResourceFactory} from '../../src/ResourceFactory';

describe('ResourceFactory', () => {

    let apiDoc;
    let factory;

    beforeEach(() => factory = new ResourceFactory());

    describe('createResource', () => {
        it('should apply selected mixins', () => {
            // given
            factory.mixins.push({
                shouldApplyMixin: () => true,
                mixinFunction: (Base) => class extends Base {
                    get mixed() { return true; }
                }
            });

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.mixed).toBe(true);
        });

        it('should not apply selected mixins', () => {
            // given

            factory.mixins.push({
                shouldApplyMixin: () => false,
                mixinFunction: (Base) => class extends Base {
                    get unmixed() { return true; }
                }
            });

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.unmixed).toBeUndefined();
        });
    });
});
