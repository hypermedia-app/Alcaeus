import {HydraResource as ResourceCtor} from "./Resources";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {Alcaeus} from './alcaeus';

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = ResourceCtor;
export let Hydra = new Alcaeus();
