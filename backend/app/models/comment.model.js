'use strict'

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
    content: {
      type: Sequelize.TEXT,
      required: true
    },
    status: {
      type: Sequelize.ENUM,
      values: ['approved', 'rejected', 'in review']
    },
    created_at: {
      type: Sequelize.DATE,
      value: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at:  Sequelize.DATE,
    deleted_at: Sequelize.DATE
  }, {
    underscored: true
  });

  return Comment;
};