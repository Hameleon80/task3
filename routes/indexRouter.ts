//import modules
import express from 'express';
import { validateIdMiddleware } from '../middleware/validateIdMiddleware';
import { validateNoteMiddleware } from '../middleware/validateNoteMiddleware';
import idValidateSchema from '../model/idValidateSchema';
import noteValidateSchema from '../model/noteValidateSchema';
import  Items from '../services/items';

const router = express.Router();

//routing
router.post('/notes',validateNoteMiddleware(noteValidateSchema) ,Items.createNote); //create Note
router.get('/notes', Items.getAllNotes);    //get all notes
router.get('/notes/stats', Items.statistic);    //get statistics active/archive notes
router.delete('/notes/:id',  validateIdMiddleware(idValidateSchema), Items.deleteItem); //delete note
router.patch('/notes/:id', validateIdMiddleware(idValidateSchema) ,validateNoteMiddleware(noteValidateSchema), Items.editItem); //edit note
router.get('/notes/:id',  validateIdMiddleware(idValidateSchema), Items.retriveItem);   //Retrive note

export default router;