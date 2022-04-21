import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import idValidateSchema from "../model/idValidateSchema";
/**
 * Middleware to validate given id (must be a number and positiv)
 * 
 * @param schema - yup schema of validation id
 * @returns - or next or error
 */
export const validateIdMiddleware = (schema: AnySchema) => async (req: Request, resp: Response, next: NextFunction) => {
    const params = req.params;
    try{
        await idValidateSchema.validate(params); //validate
        next();         //if ok, move next
    }catch(error){
        resp.status(400).json(error);  //if not ok -> error
    }
}