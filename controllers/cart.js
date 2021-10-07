const Carts = require("../models/carts");


const getCart = async (req, res) => {
	try {
		const cart = await Carts.findOne({ user: req.userId });
		const cartCount = await cart.count('_id')
		console.log(cartCount)
		return res.json(cart);
	} catch(error) {
		return res.status(500).json({ msg: error.message })
	}
}

const addToCart = async (req, res) => {
	try {
		const { products, cartTotal } = req.body;

		const newItem = new Carts({
			user: req.userId,
			products
		});
		await newItem.save();
		return res.json(newItem)
	} catch(error) {
		return res.status(500).json({ msg: error.message })
	}
}

// const updateCart = async (req, res) => {
// 	try {

// 	} catch(error) {
// 		return res.status(500).json({ msg: error.message })
// 	}
// }

// const removeFromCart = async (req, res) => {
// 	try {
// 		const cart = await Carts.find({ req.params.})
// 	} catch(error) {
// 		return res.status(500).json({ msg: error.message })
// 	}
// }

module.exports = {
	getCart,
	addToCart
}