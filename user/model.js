const Sequelize = require('sequelize');
const sequelize = require('../db');
const Room = require('../room/model');
const Board = require('../board/model');

const User = sequelize.define(
	'user',
	{
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		points: Sequelize.INTEGER
	},
	{
		timestamps: false,
		tableName: 'users'
	}
);

User.belongsTo(Room);
Board.belongsTo(Room);
Room.hasMany(User);
Room.hasOne(Board);

module.exports = User