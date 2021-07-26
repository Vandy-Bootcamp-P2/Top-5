const { Model, DataTypes, } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  static Liked(body, models){
    return models.Likes.create({
      user_id: body.user_id,
      post_id: body.post_id
    }) .then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'like_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      })
    })
  }
}

Post.init(
    {
      id: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true 
    },
      title: {
        type: DataTypes.STRING
    },
    //user text of there post
      caption: {
        type: DataTypes.STRING
      },
      //top 5 list for the post
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
      },
      likes_id: {
        type: DataTypes.INTEGER,
        references: {
          model:'likes',
          key:'id'
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