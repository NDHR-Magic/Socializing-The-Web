const sequelize = require("../config/connection");
const { User, Song, Playlist, Tag, SongTag, Notes, Friend } = require("../models");
const userData = require("./user-seeds.json");
const songData = require("./song-seeds.json");
const playlistData = require("./playlist-seeds.json");
const tagData = require("./tag-seeds.json");
const songTagData = require("./song-tag-seeds.json");
const noteData = require("./note-seeds.json");

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: false });

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        await Tag.bulkCreate(tagData);

        await Playlist.bulkCreate(playlistData);

        await Song.bulkCreate(songData);

        await SongTag.bulkCreate(songTagData);

        await Notes.bulkCreate(noteData);

        process.exit(0);
    } catch (e) {
        console.log(e);
    }
}

seedDatabase();