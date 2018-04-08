import {Alcaeus as Client} from './alcaeus';
import RdfProcessor from './MediaTypeProcessors/RdfProcessor';
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import DefaultMixins from './ResourceFactoryDefaults';
import HydraResource from './Resources/HydraResource';
import {AllDefault} from './RootSelectors';

const defaultRootSelectors = Object.values(AllDefault);

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = HydraResource;
export let Alcaeus = Client;
export let Hydra = new Client(defaultRootSelectors, {
    RDF: new RdfProcessor(new ResourceFactory(DefaultMixins)),
});
