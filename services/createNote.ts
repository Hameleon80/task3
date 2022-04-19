import { Request, Response } from "express";
import { Note } from "../repositories/Note";
import {Notes} from '../repositories/initialData'

export const createNote = (req: Request, resp: Response) =>{
    const {name, date, category, text} = req.body;
    const newNote = new Note(Notes.notes.length, name, date, category, text);
    return resp.status(200).json(newNote);
}