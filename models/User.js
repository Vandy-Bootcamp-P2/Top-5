const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}
  
// create fields/columns for User model
User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, required: true, allowNull: false },
    lastName: { type: DataTypes.STRING, required: true, allowNull: false },
    username: { type: DataTypes.STRING, required: true, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { type: DataTypes.STRING, allowNull: false, 
        validate: {
        len: [4]
      }
    },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
