import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middleware/auth';
import FileController from './app/controller/FileController';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
const router = new Router();
const upLoad = multer(multerConfig);

router.post('/user',UserController.store);
router.post('/session',SessionController.store);
router.use(authMiddleware);

router.post('/file',upLoad.single('file'),FileController.store);


export default router;