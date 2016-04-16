'use strict';

import {Resource} from './heracles';
import {ApiDocumentation} from "./ApiDocumentation";

export class PartialCollectionView extends Resource {
    constructor(actualResource, apiDoc:ApiDocumentation, incomingLinks, collection) {
        super(actualResource, apiDoc, incomingLinks);
    }

}