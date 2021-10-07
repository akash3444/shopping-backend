const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		const token = req.headers['x-auth-token']; 
		// console.log("REQ", req)
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		if(!id) throw new Error('Invalid token');
		req.userId = id;
	} catch(error) {
		return res.status(401).json({ msg: error.message })
	}
	next();
}

module.exports = auth;