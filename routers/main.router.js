import uploadFile from '../middlewares/upload.js';
import mainController from '../controllers/main.controller.js';
import express from 'express';

const router = express.Router();

router.post('/extractmetadata', uploadFile.uploadFile, mainController.createMetaData);
router.post('/writemetadata', uploadFile.uploadFile, mainController.writeMetaData)

export { router };
