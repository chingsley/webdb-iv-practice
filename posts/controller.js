import Post from '../data/models/Post';

const findAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get Posts.' });
  }
};

const findPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: `Could not find post with id ${id}` });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to get post' });
  }
};

const AddNewPost = async (req, res) => {
  const newPost = req.body;
  try {
    const [id] = await Post.add(newPost);
    if (id) {
      res.status(201).json({ created: id });
    } else {
      res.status(500).json({ error: 'Failed to add new post.' });
    }
  } catch (err) {
    console.log(err);
    if (err.code && err.code === 'SQLITE_CONSTRAINT') {
      return res.status(403).json({ error: `Could not find a user with user_id ${req.body.user_id}` });
    }
    res.status(500).json({ error: 'Failed to add new post.' });
  }
};

const EditPost = async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    const count = await Post.edit(id, changes);
    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: `Could not find a Post with the id ${id}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

const removePost = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Post.remove(id);
    if (count) {
      res.status(200).json({ removed: count });
    } else {
      res.status(404).json({ error: `Could not find post with id ${id}` });
    }
  } catch (err) {
    console.log('err = ', err);
    res.status(400).json({ error: 'Failed to delete post. ' });
  }
};

const PostController = {
  findAllPosts,
  findPostById,
  AddNewPost,
  EditPost,
  removePost
};

export default PostController;
