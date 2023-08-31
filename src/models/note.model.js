const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.connection');
const User = require('./user.model');
const { NoteType } = require('../enums');

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(NoteType.PERSONAL, NoteType.WORK),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    }
}, {
    timestamps: true
});

Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;





