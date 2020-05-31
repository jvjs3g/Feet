import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middleware/auth';
import FileController from './app/controller/FileController';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DelivController from './app/controller/DelivController';
import ShoppingController from './app/controller/ShoppingController';
import DeliveryShopping from './app/controller/DeliveryShoppingController';
import DeliveryStatusShopping from './app/controller/DeliveryStatusShoppingController';
import DeliveryFinishShopping from  './app/controller/DeliveryFinishShoppingController';
import DeliveryUpPhoto from './app/controller/DeliveryUpPhotoController';
import DelivProblems from './app/controller/DelivProblemsController';
import DelivCancellation from './app/controller/DelivCancellation';

const router = new Router();
const upLoad = multer(multerConfig);

router.get('/delivery/:id/shopping',DeliveryShopping.index);
router.put('/delivery/:id/shopping',DeliveryStatusShopping.update);
router.put('/delivery/:id/shoppingFinish',DeliveryFinishShopping.update);
router.post('/delivery/photo',upLoad.single('file'),DeliveryUpPhoto.store);
router.post('/delivery/problems/:id',DelivProblems.store);


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

router.post('/shopping',ShoppingController.store);
router.get('/shopping',ShoppingController.index);
router.put('/shopping/:id',ShoppingController.update);
router.delete('/shopping/:id',ShoppingController.delete);

router.get('/delivery/problems',DelivProblems.index);
router.get('/delivery/problems/:id',DelivProblems.show);

router.put('/problem/:id/cancellation',DelivCancellation.update);

router.post('/file',upLoad.single('file'),FileController.store);


export default router;