// Imports Sequelize components
const { Model, DataTypes } = require("sequelize");
// Imports sequelize configs
const sequelize = require("../config/connection");

// Makes Post class extending Model
class BlogPost extends Model {}

// Post model
BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
            onDelete: "SET NULL",
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "blogPost",
    }
);

module.exports = BlogPost;