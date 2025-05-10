import { Router } from 'express';
import * as Controller from '#src/controllers/User.controller.js';

var router = Router();
router.get('/', Controller.Get);
router.get('/:id', Controller.GetById);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);
router.post('/update-password/:id', Controller.UpdatePassword);
router.post('/login', Controller.Login);
router.post('/register', Controller.Insert);

export default router;
