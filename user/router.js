const { Router } = require('express');
const router = new Router();
const User = require('./model');
const bcrypt = require('bcrypt');

router.post('/user', (req, res, next) => {
	const user = {
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10)
	};

	User.create(user)
		.then(user => res.json(user))
		.catch(next);
});

module.exports = router;
