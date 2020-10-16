module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.TEXT,
            required: true
        },
        content: {
            type: Sequelize.TEXT,
            required: true
        },
        created_at: {
            type: Sequelize.DATE,
            value: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: Sequelize.DATE,
        deleted_at: Sequelize.DATE
    }, {
        underscored: true
    });
    return Post;
};
