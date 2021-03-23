const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SongTag extends Model { }

SongTag.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "song",
            key: "id"
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "tag",
            key: "id"
        }
    },
    selfGranted: DataTypes.BOOLEAN
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "song_tag",
    underscored: true
});

module.exports = SongTag;