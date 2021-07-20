const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
  pwCheck(loginPW) {
    return bcrypt.compareSync(loginPW, this.password)
}
}
  
// create fields/columns for User model
User.init(
  {
    id: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true 
    },
    firstName: { 
      type: DataTypes.STRING, 
      required: true, 
      allowNull: false 
    },
    lastName: { 
      type: DataTypes.STRING, 
      required: true, 
      allowNull: false 
    },
    username: { 
      type: DataTypes.STRING, 
      required: true, 
      unique: true, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false, 
        validate: {
        len: [4]
      }
    },
    },{
  //   hooks: {
  //     async createPW(newUserData) {
  //         newUserData.password = await bcrypt.hash(newUserData, 10)
  //         return newUserData;
  //     },
  //     async updatePW(updateUserData) {
  //         updateUserData.password = await bcrypt.hash(updateUserData, 10)
  //         return updateUserData;
  //     }
  // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
