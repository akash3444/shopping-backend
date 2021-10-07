const Users = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const user = await Users.findOne({ email });
		console.log(user)
		if(user) throw new Error('Email is already taken.');

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		const newUser = new Users({
			username,
			email,
			password: passwordHash	
		});
		await newUser.save();
		return res.json({ username, email })
	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

const login = async (req, res) => {
	try {
		const {email, password} = req.body;

		const user = await Users.findOne({ email });
		// Check for user
		if(!user) throw new Error('Incorrect email or password');

		// Check for password
		const isValid = await bcrypt.compare(password, user.password);
		console.log(isValid)
		if(!isValid) throw new Error('Incorrect email or password');

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

		return res.json({ username: user.username, email, token })

	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

module.exports = { register, login };