module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            required: true
        },
        lastName: {
            type: DataTypes.STRING,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        department: {
            type: DataTypes.ENUM,
            values: ['achat', 'finances', 'marketing', 'ressources humaines']

        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'disabled']

        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        underscored: true
    });
    return User;
};