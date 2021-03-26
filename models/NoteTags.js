const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");
class NoteTag extends Model { }


NoteTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        note_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "song",
                key: "id"
            }
            
        },

        tag_id: {
            type:DataTypes.INTEGER,
            references: {
                model:"tag",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: "notetag"
    }
);

module.exports = NoteTag;