// tslint:disable:max-classes-per-file
import { entries } from 'core-js/es7/object';
import {ResourceFactory} from '../src/ResourceFactory';

describe('ResourceFactory', () => {

    const apiDoc = null;
    let factory;

    beforeEach(() => factory = new ResourceFactory());

    describe('createResource', () => {
        it('should apply selected mixins', () => {
            // given
            const Mixin = (Base) => class extends Base {
                get mixed() { return true; }
            };
            const shouldApply = () => true;

            factory.mixins.push({ Mixin, shouldApply });

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.mixed).toBe(true);
        });

        it('should not apply unselected mixins', () => {
            // given
            const Mixin = (Base) => class extends Base {
                get unmixed() { return true; }
            };
            const shouldApply = () => false;

            factory.mixins.push({ Mixin, shouldApply });

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.unmixed).toBeUndefined();
        });

        it('should not apply selected mixin without shouldApply', () => {
            // given
            const Mixin = (Base) => class extends Base {
                get unmixed() { return true; }
            };

            factory.mixins.push({ Mixin });

            // when
            const resource = factory.createResource(null, {}, apiDoc, {});

            // then
            expect(resource.unmixed).toBeUndefined();
        });
    });
});
