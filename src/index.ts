import {HydraResource as ResourceCtor} from "./Resources";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {Heracles} from './heracles';

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = ResourceCtor;
export let Hydra = new Heracles();