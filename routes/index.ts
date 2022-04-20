//import modules
import express, { Request, Response } from 'express';
import { Note } from '../repositories/Note';
import  Items from '../services/items';

const router = express.Router();

//routing
router.post('/notes', Items.createNote);
router.get('/notes', Items.getAllNotes);
router.delete('/notes/:id', Items.deleteItem);
router.patch('/notes/:id', Items.editItem);
router.get('/notes/:id', Items.retriveItem);
router.get('/notes/stats');

export default router;