import Resource from './Resource';

export type Constructor<T = Resource> = new (...args: any[]) => T;
