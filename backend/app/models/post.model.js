module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    // user_id: {
    // //   type: DataTypes.TEXT,
    // //   allowNull: false
    // // },
    title: {
      type: DataTypes.TEXT,
      required: true
    },
    content: {
      type: DataTypes.TEXT,
      required: true
    },
    created_at: {
      type: DataTypes.DATE,
      value: sequelize.fn('NOW')
    }
    // updated_at:  DataTypes.DATE,
    // deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });
  return Post;
};