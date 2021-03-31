const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Message extends Model { }

Message.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    messenger_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "messages"
});

module.exports = Message;