//import modules
import express, { Request, Response } from 'express';
import { createNote } from '../services/createNote';
import  Items from '../services/items';

const router = express.Router();

//routing
router.get('/', (req:Request, resp: Response)=>{
    resp.status(200).json({message: "Hello"})
})
router.post('/notes', createNote);
router.delete('/notes/:id');
router.patch('/notes/:id', Items.editItem);
router.get('/notes/:id');
router.get('/notes');
router.get('/notes/stats');

export default router;