const { Router } = require('express');
const router = new Router();
const User = require('./model');
const bcrypt = require('bcryptjs');

router.post('/user', (req, res, next) => {
	const user = {
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10)
	};

	User.create(user)
		.then(user => res.json(user))
		.catch(next);
});


router.put('/join', (req, res, next) => {
	console.log('Req.body is : ', req.body)
	User.findByPk(parseInt(req.body.userId))
	.then(user => {
		if(!user) {
			return res.status(404).send({message: 'User not found'})
		}
		user.update(req.body)
		.then(user => res.send(user))
		.catch(() => res.status(404).send({message: 'Could not update the user'}))
	})
})

module.exports = router;
