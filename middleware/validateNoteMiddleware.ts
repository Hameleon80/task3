import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import noteValidateSchema from "../model/noteValidateSchema";
/**
 * Middleware to validate date for create/edit Note
 * 
 * @param schema - yup schema to validate Note fields
 * @returns - or nex or error
 */
export const validateNoteMiddleware = (schema: AnySchema) => async (req:Request, resp: Response, next: NextFunction) => {
    const body = req.body;
    try{
        await noteValidateSchema.validate(body);
        next();
    }catch (error){
        return resp.status(400).json(error);
    }
}