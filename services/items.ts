import { Request, Response } from "express";
import { Note } from "../repositories/Note";
import { Notes } from "../repositories/initialData";
import { fillNoteValues, getNoteById } from "../helpers/util";

class Items {
    static editItem (req: Request, resp: Response) {
        const {id} = req.params;
        let changedNote: Note = getNoteById(Notes.notes, +id);
        return resp.status(200).json(fillNoteValues(req, changedNote));
    }

    static deleteItem (req: Request, resp: Response) {
        
    }

    static retriveItem (req: Request, resp: Response) {
        
    }
}

export default Items;