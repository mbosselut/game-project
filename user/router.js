const { Router } = require('express');
const router = new Router();
const User = require('./model');
const bcrypt = require('bcryptjs');
const auth = require('../auth/middleware');
const { toData } = require('../auth/jwt');
const Room = require('../room/model')

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
