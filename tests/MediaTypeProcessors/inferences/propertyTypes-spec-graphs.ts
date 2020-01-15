import { createGraph } from '../../test-utils'

const hydraProperties = `
 <API> hydra:supportedClass <Class> .
 
 <Class> hydra:supportedOperation <Operation> ;
         hydra:supportedProperty <Property> .
 
 <Operation> hydra:expects <ExpectedClass> ;
             hydra:returns <ReturnedClass> ;
             hydra:statusCodes [] .
             
 <Property> hydra:property foaf:knows .
             
 <Resource> hydra:operation <OperationInstance> ;
            hydra:mapping <IriTemplateMapping> . 
`

export const managesWithType = createGraph(hydraProperties)
