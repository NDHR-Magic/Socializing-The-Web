const sequelize = require("../config/connection");
const { User, Song, Playlist } = require("../models");
const userData = require("./user-seeds.json");
const songData = require("./song-seeds.json");
const playlistData = require("./playlist-seeds.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);

    await Playlist.bulkCreate(playlistData);

    await Song.bulkCreate(songData);
}

seedDatabase();