import {Alcaeus as Client} from './alcaeus';
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import HydraResource from './Resources/HydraResource';
import {AllDefault} from './RootSelectors';

const defaultRootSelectors = Object.values(AllDefault);

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = HydraResource;
export let Alcaeus = Client;
export let Hydra = new Client(defaultRootSelectors);
