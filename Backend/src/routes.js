import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middleware/auth';
import FileController from './app/controller/FileController';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DelivController from './app/controller/DelivController';

const router = new Router();
const upLoad = multer(multerConfig);

router.post('/user',UserController.store);
router.post('/session',SessionController.store);
router.use(authMiddleware);

router.post('/recipient',RecipientController.store);
router.get('/recipient',RecipientController.index);
router.put('/recipient/:id',RecipientController.update);
router.delete('/recipient/:id',RecipientController.delete);

router.post('/delivery',DelivController.store);
router.get('/delivery', DelivController.index);
router.put('/delivery/:id',DelivController.update);
router.delete('/delivery/:id',DelivController.delete);

router.post('/file',upLoad.single('file'),FileController.store);


export default router;