import db from '../dbConfig';

const findAll = () => db('posts');
const findById = id => db('posts').where({ id });
const add = newUser => db('posts').insert(newUser);
const edit = (id, changes) => db('posts').where({ id }).update(changes);
const remove = id => db('posts').where({ id }).del();

const Post = {
  findAll,
  findById,
  add,
  edit,
  remove
};

export default Post;

