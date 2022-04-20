import { NextFunction, Request, Response } from "express";
import { Note } from "../repositories/Note";
import { Notes, ArchiveNotes } from "../repositories/initialData";
import { deleteNoteById, fillNoteValues, getNoteById } from "../helpers/util";
import { ApiError } from "../error/ApiError";

class Items {
    /**
     * Creates new note
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - updated arrays
     */
    static createNote (req: Request, resp: Response ){
        const {name, date, category, text} = req.body;
        const newNote = new Note(Notes.notes.length, name, date, category, text);
        Notes.notes.push(newNote);
        return resp.status(200).json({NOTES: Notes.notes, ARCHIVED: ArchiveNotes.notes});
    }
    /**
     * Edits given note
     * 
     * @param req - http request
     * @param resp - http response
     * @param next - next function
     * @returns - updated arrays
     */
    static editItem(req: Request, resp: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            let changedNote: Note;
            changedNote = getNoteById(Notes.notes, +id);
            changedNote = fillNoteValues(req, changedNote)
            return resp.status(200).json({NOTES: Notes.notes, ARCHIVED: ArchiveNotes.notes});
        } catch (e) {
            next(e);
        }
    }
    /**
     * Delete note
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - updated arrays of notes
     */
    static deleteItem(req: Request, resp: Response) {
        const { id } = req.params;
        let isValidId = false;
        //find in active notes
        Notes.notes.map((value) => {
            if(value.getId() === +id){
                isValidId = true;
            }
        })
        //Delete from active notes
        if(isValidId){
            Notes.notes = deleteNoteById(Notes.notes, +id);
        }
        //find in archive notes
        ArchiveNotes.notes.map((value) => {
            if(value.getId() === +id){
                isValidId = true;
            }
        })
        //Delete from archive notes
        if(isValidId){
            ArchiveNotes.notes = deleteNoteById(Notes.notes, +id);
        }
        if(!isValidId) {
            throw new ApiError(404, "Note is already not exist")
        }
        
        return resp.json({NOTES: Notes.notes, ARCHIVE: ArchiveNotes.notes});
    }
    /**
     * Extract note from array
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - Retrieved note
     */
    static retriveItem(req: Request, resp: Response) {
        const { id } = req.params;
        let isValidId = false;
        let result: Note = new Note(+id);
        Notes.notes.map((value) => {
            if(value.getId() === +id){
                isValidId = true;
            }
        })
        //If note in active notes, move it to archive
        if(isValidId){
            result = getNoteById(Notes.notes, +id);
            Notes.notes = deleteNoteById(Notes.notes, +id);
            ArchiveNotes.notes.push(result);
        } else{
            //Else if note in archive move it from archive to active notes
            ArchiveNotes.notes.map((value)=>{
                if(value.getId() === +id){
                    isValidId = true;
                }
            })
            if(isValidId){
                result = getNoteById(ArchiveNotes.notes, +id);
                ArchiveNotes.notes = deleteNoteById(ArchiveNotes.notes, +id);
                Notes.notes.push(result);
            }
        }
        if(!isValidId) {
            throw new ApiError(404, "Note don't exist")
        }
        
        return resp.json({NOTES: Notes.notes, ARCHIVE: ArchiveNotes.notes});
    }
    /**
     * Getts all active and archived notes 
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - object that containce two arrays (active notes and archived notes)
     */
    static getAllNotes(req: Request, resp: Response){
        return resp.json({NOTES: Notes.notes, ARCHIVE: ArchiveNotes.notes});
    }

    static statistic(req: Request, resp: Response){
        return {
            Active: Notes.notes.length,
            Archive: ArchiveNotes.notes.length
        }
    }
}

export default Items;