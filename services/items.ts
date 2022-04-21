import { NextFunction, Request, Response } from "express";
import { Note } from "../repositories/Note";
import { Notes, ArchiveNotes } from "../repositories/initialData";
import { deleteNoteById, fillNoteValues, getNoteById, isValid } from "../helpers/util";
import { ApiError } from "../error/ApiError";

/**
 * Class with methods to create/delete/edit notes
 */

class Items {
    /**
     * Creates new note
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - updated arrays
     */
    static createNote(req: Request, resp: Response) {
        const { name, dateCreate, category, text } = req.body;
        const newNote = new Note(Notes.notes.length + ArchiveNotes.notes.length, name, new Date(dateCreate), category, text);
        Notes.notes.push(newNote);
        return resp.status(200).json(Notes.notes);
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
            let { id } = req.params;
            let changedNote: Note;
            changedNote = getNoteById(Notes.notes, +id);
            changedNote = fillNoteValues(req, changedNote)
            return resp.status(200).json(Notes.notes);
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
        //If note in active notes
        isValidId = isValid(Notes.notes, +id);
        //Delete from active notes
        if (isValidId) {
            Notes.notes = deleteNoteById(Notes.notes, +id);
        } else {
            //If note in archive notes
            isValidId = isValid(ArchiveNotes.notes, +id);
            //Delete from archive notes
            if (isValidId) {
                ArchiveNotes.notes = deleteNoteById(ArchiveNotes.notes, +id);
            }
        }
        //If there is no notes with given id, throws error
        if (!isValidId) {
            throw new ApiError(404, "Note it doesn't exist")
        }

        return resp.json({ NOTES: Notes.notes, ARCHIVE: ArchiveNotes.notes });
    }
    /**
     * Retrieve note from array
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - Retrieved note
     */
    static retriveItem(req: Request, resp: Response) {
        const { id } = req.params;
        let isValidId = false;
        let result: Note = new Note(+id);
        //Is note in active notes?
        isValidId = isValid(Notes.notes, +id);
        //If note it is, move it to archive
        if (isValidId) {
            result = getNoteById(Notes.notes, +id);
            Notes.notes = deleteNoteById(Notes.notes, +id);
            ArchiveNotes.notes.push(result);
        } else {
            //Else if note in archive move it from archive to active notes
            isValidId = isValid(ArchiveNotes.notes, +id);
            if (isValidId) {
                result = getNoteById(ArchiveNotes.notes, +id);
                ArchiveNotes.notes = deleteNoteById(ArchiveNotes.notes, +id);
                Notes.notes.push(result);
            }
        }
        if (!isValidId) {
            throw new ApiError(404, "Note it doesn't exist")
        }

        return resp.json({ NOTES: Notes.notes, ARCHIVE: ArchiveNotes.notes });
    }
    /**
     * Getts all active and archived notes 
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - object that containce two arrays (active notes and archived notes)
     */
    static getAllNotes(req: Request, resp: Response) {
        return resp.json({ NOTES: Notes.notes, ARCHIVE: ArchiveNotes.notes });
    }

    /**
     * Returns numbers of active and archive notes.
     * 
     * @param req - http request
     * @param resp - http response
     * @returns - numbers of active and archive notes
     */
    static statistic(req: Request, resp: Response) {
        return resp.status(200).json({Active: Notes.notes.length, Archive: ArchiveNotes.notes.length});
    }

}

export default Items;