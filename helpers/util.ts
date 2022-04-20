import { NextFunction, Request } from "express";
import { ApiError } from "../error/ApiError";
import { Note } from "../repositories/Note";

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'
];

//return string of dates (in format dd/dd//dddd) that have in given string
export const getDatesFromText = (text: string) => {
    let result: string = '';
    if (text.length !== 0) {
        const regex = /\d+\/\d+\/\d+/g;
        const array = Array.from(text.matchAll(regex));

        for (let i = 0; i < array.length; i++) {
            i === 0 ? result += array[i] : result += ', ' + array[i];
        }
    }

    return result;
}

//Get note from array by id
export function getNoteById(notes: Note[], id: number) {
    let result: Note = new Note(-1);
    if (notes.length !== 0) {
        notes.map((item) => {
            if (item.getId() === id) {
                result = item;
            }
        })
    }
    if (result.getId() === -1) {
        throw new ApiError(400, "Id is incorrect");
    }
    return result;
}

//Fill object Note by values from request
export function fillNoteValues(req: Request, note: Note) {
    const { name, date, category, text } = req.body;
    note.setName(name);
    note.setDateCreate(date);
    note.setCategory(category);
    note.setText(text);
    return note;
}

//Delete note by id
export function deleteNoteById(notes: Note[], id: number) {
    return notes.filter((value) => value.getId() !== id);
}