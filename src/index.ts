import HydraResource from "./Resources/HydraResource";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {Alcaeus} from './alcaeus';

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = HydraResource;
export let Hydra = new Alcaeus();
