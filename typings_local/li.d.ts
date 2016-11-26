export interface LinkHeaderObj {
    [key: string]: string;
}

export function parse(linkHeader: string): LinkHeaderObj;

export function stringify(links: LinkHeaderObj): string;