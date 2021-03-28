const User = require("./Users");
const Song = require("./Songs");
const Playlist = require("./playlist");
const Tag = require("./Tags");
const SongTag = require("./Song-tags");
const Notes = require("./Notes");
const Friend = require("./Friends");
const NoteTag = require("./NoteTags");
const SongPlaylist = require("./Song-playlist");

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

Notes.belongsToMany(Tag, { through: NoteTag, foreignKey: "note_id" });
Tag.belongsToMany(Notes, { through: NoteTag, foreignKey: "tag_id" });
Song.belongsToMany(Tag, { through: SongTag, foreignKey: "song_id" });
Tag.belongsToMany(Song, { through: SongTag, foreignKey: "tag_id" });

User.belongsToMany(User, { through: Friend, as: "User", foreignKey: "user_id", onDelete: "CASCADE" });
User.belongsToMany(User, { through: Friend, as: "Friend", foreignKey: "friend_id", onDelete: "CASCADE" });

User.belongsToMany(User, { as: "Requestees", through: "friendRequests", foreignKey: 'requesterId', onDelete: 'CASCADE' });
User.belongsToMany(User, { as: "Requesters", through: "friendRequests", foreignKey: 'requesteeId', onDelete: 'CASCADE' });

Song.belongsToMany(Playlist, { through: SongPlaylist, foreignKey: "song_id" });
Playlist.belongsToMany(Song, { through: SongPlaylist, foreignKey: "playlist_id" });

module.exports = { User, Song, Playlist, Tag, SongTag, Notes, Friend };