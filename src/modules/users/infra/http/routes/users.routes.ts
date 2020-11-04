import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();
const useravatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  useravatarController.update,
);

export default usersRouter;