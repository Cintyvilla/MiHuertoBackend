import { Router } from 'express';
import * as controller from '#src/controllers/PlantsOnOrchards.controller.js';

var router = Router();
router.get('/', controller.Get);
router.post('/', controller.Insert);
router.get('/:id', controller.GetById);
router.delete('/:id', controller.Delete);

export default router;
