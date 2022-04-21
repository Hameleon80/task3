import { number, object } from 'yup'
/**
 * Schema to validate id
 */
let idValidateSchema = object({
    id: number().positive()
});

export default idValidateSchema;