import HydraResource from "./Resources/HydraResource";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {Alcaeus} from './alcaeus';
import {AllDefault} from './RootSelectors';

const defaultRootSelectors = Object.values(AllDefault);

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = HydraResource;
export let Hydra = new Alcaeus(defaultRootSelectors);
