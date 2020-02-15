import express from 'express';
import UserController from './controller';

const router = express.Router();
const {
  findAllUsers,
  findUserById,
  AddNewUser,
  EditUser,
  removeUser
} = UserController;

router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.post('/', AddNewUser);
router.put('/:id', EditUser);
router.delete('/:id', removeUser);

export default router;
