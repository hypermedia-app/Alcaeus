import { entries } from 'core-js/es7/object';
import {ResourceFactory} from '../src/ResourceFactory';

describe('ResourceFactory', () => {

    let apiDoc;
    let factory;

    beforeEach(() => factory = new ResourceFactory());

    describe('createResource', () => {
        it('should apply selected mixins', () => {
            // given
            const mixin = (Base) => class extends Base {
                get mixed() { return true; }
            };
            mixin['shouldApply'] = () => true;

            factory.mixins.push(mixin);

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.mixed).toBe(true);
        });

        it('should not apply unselected mixins', () => {
            // given
            const mixin = (Base) => class extends Base {
                get unmixed() { return true; }
            };
            mixin['shouldApply'] = () => false;

            factory.mixins.push(mixin);

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.unmixed).toBeUndefined();
        });

        it('should not apply selected mixin without shouldApply', () => {
            // given
            const mixin = (Base) => class extends Base {
                get unmixed() { return true; }
            };

            factory.mixins.push(mixin);

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.unmixed).toBeUndefined();
        });
    });
});
