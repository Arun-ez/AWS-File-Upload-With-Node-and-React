import { Router } from "express";
import { pushObject, updateObject, removeObject } from "../controllers/storage.controller.js";
import { multer_parser } from "../configs/multer.config.js";

const storageRouter = Router();

storageRouter.post('/:folder', multer_parser.single('file'), pushObject);
storageRouter.patch('/', multer_parser.single('file'), updateObject);
storageRouter.delete('/', removeObject);

export { storageRouter }
