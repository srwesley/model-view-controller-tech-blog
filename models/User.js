// Imports Sequelize components
const { Model, DataTypes } = require("sequelize");
// Imports sequelize configs
const sequelize = require("../config/connection");
// Imports bcrypt
const bcryptjs = require("bcryptjs");

// Makes User class extending Model
class User extends Model {
    checkPassword(loginPw) {
        return bcryptjs.compareSync(loginPw, this.password);
    }
}

// User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 23], // Password must be somewhere between 8-23 charachters long
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcryptjs.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcryptjs.hash(
                    updatedUserData.password,
                    10
                );
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;