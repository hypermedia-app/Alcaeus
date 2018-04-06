import HydraResource from "./Resources/HydraResource";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {Alcaeus as Client} from './alcaeus';
import {AllDefault} from './RootSelectors';

const defaultRootSelectors = Object.values(AllDefault);

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = HydraResource;
export let Alcaeus = Client;
export let Hydra = new Client(defaultRootSelectors);
