import upload from "../middlewares/upload";
import mainController from "../controllers/main.controller";
import express from "express";

const router=express.Router();

router.post('/extractdata', upload, mainController.createMetaData);

export default {router}

