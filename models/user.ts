import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  unique_email: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});

export default User;
