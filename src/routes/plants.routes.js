import { Router } from 'express';
import * as controller from '#src/controllers/Plant.controller.js';

var router = Router();
router.get('/', controller.Get);
router.post('/', controller.Insert);
router.get('/:id', controller.GetById);
router.put('/:id', controller.Update);
router.delete('/:id', controller.Delete);

export default router;
