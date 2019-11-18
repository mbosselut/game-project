const { Router } = require('express');
const { toJWT, toData } = require('./jwt');
const User = require('../user/model');
const bcrypt = require('bcrypt');
const auth = require('./middleware');

const router = new Router();

router.get('/secret-endpoint', auth, (req, res) => {
	res.send({
		message: `Thanks for visiting the secret endpoint ${req.user.username}.`
	});
});

router.post('/login', (req, res, next) => {
	if (req.body.username && req.body.password) {
		// 1. find user based on username
		User.findOne({
			where: {
				username: req.body.username
			}
		})
			.then(entity => {
				if (!entity) {
					res.status(400).send({
						message: 'User with that username does not exist'
					});
				}

				// 2. use bcrypt.compareSync to check the password against the stored hash
				else if (
					bcrypt.compareSync(req.body.password, entity.password)
				) {
					// 3. if the password is correct, return a JWT with the userId of the user (user.id)
					res.send({
						jwt: toJWT({ userId: entity.id })
					});
				} else {
					res.status(400).send({
						message: 'Password was incorrect'
					});
				}
			})
			.catch(err => {
				console.error(err);
				res.status(500).send({
					message: 'Something went wrong'
				});
			});
	} else {
		res.status(400).send({
			message: 'Please supply a valid username and password'
		});
	}
});

module.exports = router;
