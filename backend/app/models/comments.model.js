'use strict'

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
    content: {
      type: DataTypes.TEXT,
      required: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['approved', 'rejected', 'in review']
    },
    created_at: {
      type: Sequelize.DATE,
      value: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });

  return Comment;
};