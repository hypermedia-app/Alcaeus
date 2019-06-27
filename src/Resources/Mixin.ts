import { HydraResource } from './'
import Resource from './Resource'

export type Constructor<T = Resource> = new (...args: any[]) => T;
export type HydraConstructor<T = HydraResource & Resource> = new (...args: any[]) => T;
