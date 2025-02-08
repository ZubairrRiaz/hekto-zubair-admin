import { type SchemaTypeDefinition } from 'sanity'
import { customerDetails } from './customerDetails'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [customerDetails],
}
