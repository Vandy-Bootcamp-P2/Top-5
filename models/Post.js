const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
      id: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true 
    },
      field1: { 
        type: DataTypes.STRING
      },
      field2: { 
        type: DataTypes.STRING
      },
      field3: { 
        type: DataTypes.STRING
      },
      field4: { 
        type: DataTypes.STRING
      },
      field5: { 
        type: DataTypes.STRING, 
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

module.exports = Post;