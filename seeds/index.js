const sequelize = require("../config/connection");
const { User, Song, Playlist, Tag, SongTag } = require("../models");
const userData = require("./user-seeds.json");
const songData = require("./song-seeds.json");
const playlistData = require("./playlist-seeds.json");
const tagData = require("./tag-seeds.json");
const songTagData = require("./song-tag-seeds.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);

    await Tag.bulkCreate(tagData);

    await Playlist.bulkCreate(playlistData);

    await Song.bulkCreate(songData);

    await SongTag.bulkCreate(songTagData);

    process.exit(0);
}

seedDatabase();