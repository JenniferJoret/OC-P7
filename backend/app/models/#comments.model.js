// 'use strict'

// module.exports = (sequelize, DataTypes) => {
//   const Comment = sequelize.define('comments', {
//     post_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     content: {
//       type: DataTypes.TEXT,
//       required: true
//     },
//     commenter_username: {
//       type: DataTypes.STRING,
//       required: true
//     },
//     commenter_email: {
//       type: DataTypes.STRING,
//       required: true
//     },
//     status: {
//       type: DataTypes.ENUM,
//       values: ['approved', 'rejected', 'in review']

//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     updated_at:  DataTypes.DATE,
//     deleted_at: DataTypes.DATE
//   }, {
//     underscored: true
//   });

//   return Comment;
// };