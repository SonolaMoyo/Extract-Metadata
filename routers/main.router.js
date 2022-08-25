import uploadFile from '../middlewares/upload.js';
import mainController from '../controllers/main.controller.js';
import express from 'express';

const router = express.Router();

router.post('/extractdata', uploadFile.uploadFile, mainController.createMetaData);

export { router };
