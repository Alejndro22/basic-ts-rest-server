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

const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const emailExists = await User.findOne({
      where: { unique_email: body.unique_email },
    });

    if (emailExists) {
      return res.status(400).json({
        msg: `Email ${body.unique_email} is already registered`,
      });
    }

    const user = await User.create(body);

    res.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact Admin',
    });
  }
};

const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        msg: `user with id:${id} is not registered`,
      });
    }

    await user.update(body);

    res.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact Admin',
    });
  }
};

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'deleteUser',
    id,
  });
};

export { getUsers, getUser, postUser, putUser, deleteUser };
