import { getDatesFromText, prepareDate } from "../helpers/util";

export class Note {

    constructor(id: number, name?: string, dateCreate: Date = new Date(), category?: string, text?: string){
        this.id = id;
        this.name = name || '';
        this.dateCreate = prepareDate(dateCreate);
        this.category = category || '';
        this.text = text || "";
        this.dates = getDatesFromText(text || "");
    }

    private id: number;
    private name: string;
    private dateCreate: string;
    private category: string;
    private text: string;
    private dates: string

    getId() {
        return this.id;
    }

    setName (name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDateCreate (dateCreate: Date) {
        this.dateCreate = prepareDate(dateCreate);
    }

    getDateCreate () {
        return this.dateCreate;
    }

    setCategory (category: string) {
        this.category = category;
    }

    getCategory  () {
        return this.category;
    }

    setText (text: string) {
        this.text = text;
        this.dates = getDatesFromText(text);
    }

    getText () {
        return this.text;
    }
}