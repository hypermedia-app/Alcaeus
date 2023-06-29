import Environment, { Environment as E } from '@rdfjs/environment/Environment.js'
import DatasetFactory from '@rdfjs/environment/DatasetFactory.js'
import DataFactory from '@rdfjs/environment/DataFactory.js'
import NamespaceFactory from '@rdfjs/environment/NamespaceFactory.js'
import SetsFactory, { Factory as TSF } from '@rdfjs/environment/TermMapSetFactory.js'
import FormatsFactory, { FormatsFactory as F } from '@rdfjs/environment/FormatsFactory.js'
import { DatasetCore, DatasetCoreFactory, Quad } from '@rdfjs/types'
import formats from '@rdfjs/formats-common'

export type HydraEnvironment<D extends DatasetCore> = E<F | DatasetCoreFactory<Quad, Quad, D> | TSF>

const env = new Environment([
  DatasetFactory,
  DataFactory,
  SetsFactory,
  NamespaceFactory,
  FormatsFactory,
])

env.formats.import(formats)

export default env
