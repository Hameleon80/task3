import { object, string} from 'yup'
/**
 * Schema to valdate data for Note
 */
let noteValidateSchema = object({
    name: string().required(),
    dateCreate: string().required(),
    category: string().required(),
    text: string().required()
});

export default noteValidateSchema;