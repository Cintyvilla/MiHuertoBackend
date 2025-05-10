import { Router } from 'express';
import * as Controller from '#src/controllers/Uploads.controller.js';

var router = Router();
router.post('/', Controller.UploadImage);

export default router;
