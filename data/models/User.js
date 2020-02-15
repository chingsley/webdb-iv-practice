import db from '../dbConfig';

const findAll = () => db('users');
const findById = id => db('users').where({ id });
const add = newUser => db('users').insert(newUser);
const edit = (id, changes) => db('users').where({ id }).update(changes);
const remove = id => db('users').where({ id }).del();

const User = {
  findAll,
  findById,
  add,
  edit,
  remove
};

export default User;

