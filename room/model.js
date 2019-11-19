const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('../user/model');

const Room = sequelize.define(
	'room',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
);

console.log('User test:', User)

module.exports = Room;
