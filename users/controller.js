import User from '../data/models/User';
import dbConfig from '../data/dbConfig';
import { reset } from 'nodemon';

const findAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get Users.' });
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: `Could not find user with id ${id}` });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to get user' });
  }
};

const AddNewUser = async (req, res) => {
  const newUser = req.body;
  try {
    const [id] = await User.add(newUser);
    if (id) {
      res.status(201).json({ created: id });
    } else {
      res.status(500).json({ error: 'Failed to add new user.' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.code && err.code === 'SQLITE_CONSTRAINT') {
      return res.status(403).json({ error: 'Failed to create user. The specified username is taken. ' })
    }
    res.status(500).json({ error: 'Failed to add new user.' });
  }
};

const EditUser = async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    const count = await User.edit(id, changes);
    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: `Could not find a user with the id ${id}` });
    }
  } catch (err) {
    console.log(err);
    if (err.code && err.code === 'SQLITE_CONSTRAINT') {
      return res.status(403).json({ error: 'Failed to update user. The specified username is taken. ' })
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await User.remove(id);
    if (count) {
      res.status(200).json({ removed: count });
    } else {
      res.status(404).json({ error: `Could not find user with id ${id}` });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: 'Failed to delete user. ' });
  }
};

const UserController = {
  findAllUsers,
  findUserById,
  AddNewUser,
  EditUser,
  removeUser
};

export default UserController;
