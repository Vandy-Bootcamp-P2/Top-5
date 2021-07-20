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
    // profilePic: { type: DataTypes.STRING, default: "/images/profilePic.png" },
    // likes: [{ type: DataTypes.JSON, 
    //         references: {
    //             model: 'User',
    //             key: 'id'
    //         }}],
    // following: [{ type: DataTypes.STRING, 
    //             references: {
    //                 model: "User",
    //                 key: 'id'
    //             }}],
    // followers: [{ type: Object}]
//   },
//   {
//     hooks: {
//       // set up beforeCreate lifecycle "hook" functionality
//       async beforeCreate(newUserData) {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },

//       async beforeUpdate(updatedUserData) {
//         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//         return updatedUserData;
//       }
//     },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
