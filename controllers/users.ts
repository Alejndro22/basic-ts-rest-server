import { Request, Response } from 'express';
import User from '../models/user';

const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404).json({ msg: `Couldn't find user with id:${id}` });
  } else {
    res.json({ user });
  }
};

const postUser = (req: Request, res: Response) => {
  const { body } = req;
  res.json({
    msg: 'postUser',
    body,
  });
};

const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: 'putUser',
    id,
    body,
  });
};

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'deleteUser',
    id,
  });
};

export { getUsers, getUser, postUser, putUser, deleteUser };
