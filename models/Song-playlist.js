const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SongPlaylist extends Model { }

SongPlaylist.init({
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
    playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "playlist",
            key: "id"
        }
    },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "song_playlist",
        underscored: true
    });

module.exports = SongPlaylist;