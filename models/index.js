const User = require("./Users");
const Song = require("./Songs");
const Playlist = require("./playlist");

Playlist.hasMany(Song, {
    foreignKey: "playlist_id"
});

Song.belongsTo(Playlist, {
    foreignKey: "playlist_id"
});

User.hasMany(Playlist, {
    foreignKey: "user_id"
});

Playlist.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Song, Playlist };