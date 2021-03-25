const User = require("./Users");
const Song = require("./Songs");
const Playlist = require("./playlist");
const Tag = require("./Tags");
const SongTag = require("./Song-tags");
const Notes = require("./Notes");
const Friend = require("./Friends");

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

User.hasMany(Notes, {
    foreignKey: "user_id"
});

Notes.belongsTo(User, {
    foreignKey: "user_id"
});

Song.belongsToMany(Tag, { through: SongTag, foreignKey: "song_id" });
Tag.belongsToMany(Song, { through: SongTag, foreignKey: "tag_id" });

User.belongsToMany(User, { through: Friend, as: "User", foreignKey: "user_id" });
User.belongsToMany(User, { through: Friend, as: "Friend", foreignKey: "friend_id" });

module.exports = { User, Song, Playlist, Tag, SongTag, Notes, Friend };