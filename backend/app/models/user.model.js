module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        firstName: {
            type: Sequelize.STRING,
            required: true
        },
        lastName: {
            type: Sequelize.STRING,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        password: {
            type: Sequelize.STRING,
            required: true
        },
        created_at: {
            type: Sequelize.DATE,
            value: sequelize.fn('NOW')
        }
    }, {
        underscored: true
    });
    return User;
};