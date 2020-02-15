import express from 'express';
import PostController from './controller';

const router = express.Router();
const {
  findAllPosts,
  findPostById,
  AddNewPost,
  EditPost,
  removePost
} = PostController;

router.get('/', findAllPosts);
router.get('/:id', findPostById);
router.post('/', AddNewPost);
router.put('/:id', EditPost);
router.delete('/:id', removePost);

export default router;
