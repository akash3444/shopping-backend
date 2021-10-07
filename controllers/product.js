const Products = require("../models/products");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
	try{
		const products = await Products.find({})
		const updatedProducts = products.map(product => ({...product["_doc"], image: `localhost:5000/${product.image}`}))
		return res.json(updatedProducts)
	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

const getProduct = async (req, res) => {
	try{
		const product = await Products.findById(req.params.id);
		return res.json({...product["_doc"], image: `localhost:5000/${product.image}`});
	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

const addProduct = async (req, res) => {
	try{
		const { name, description, price, category } = req.body;
		const { image, userId } = req;

		const { isAdmin } = await Users.findById(userId)
		if(!isAdmin) throw new Error('Only admin can add product');
		
		const newProduct = new Products({
			name, 
			description,
			user: userId,
			price,
			category,
			image
		})
		const savedProduct = await newProduct.save();
		return res.json(savedProduct);
	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

const updateProduct = async (req, res, next) => {
	try{
		const { name, description, price, category } = req.body;
		const { image, userId } = req;
		
		const { isAdmin } = await Users.findById(userId)
		if(!isAdmin) throw new Error('Only admin can update product');

		const product = await Products.findById(req.params.id);
		const updatedProduct = await Products.updateOne({ id: req.params.id }, {
			name: name || product.name,
			description: description || product.description,
			price: price || product.price,
			category: category || product.category,
			image: image || product.image,
		});
	
		// const updatedProduct = await Products.findByIdAndUpdate({
		// 	name,
		// 	description,
		// 	price,
		// 	category,
		// 	image
		// })

		// await updatedProduct.save();
		return res.json(updatedProduct);
	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

const deleteProduct = async (req, res, next) => {
	try{
		const { isAdmin } = await Users.findById(userId)
		if(!isAdmin) throw new Error('Only admin can delete product');

		const deletedProduct = await Products.findByIdAndDelete(req.params.id);
		return res.json(deletedProduct);
	} catch(error) {
		return res.status(500).json({ msg: 'Internal server error', description: error.message});
	}
}

module.exports = {
	getProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct
}