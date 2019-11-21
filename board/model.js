const Sequelize = require('sequelize');
const sequelize = require('../db');

const Board = sequelize.define(
	'board',
	{
		wordToGuess: {
			type: Sequelize.STRING,
			allowNull: true
		},
		guesses: {
			type: Sequelize.STRING,
			allowNull: true
		},
		gameOn: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		currentPlayer: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		roomId: {
            type: Sequelize.INTEGER,
            allowNull: false 
        }
	},
);

module.exports = Board