const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Playlist extends Model {}


Playlist.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },

        song_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:"song",
                key:"id"
            }

        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"user",
                key:"id"
            }
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:"playlist"
    }
)
module.exports = Playlist