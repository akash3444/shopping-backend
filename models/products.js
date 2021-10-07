const { Schema, model } = require("mongoose");

const productSchema = new Schema({
	name: String,
	user: { type: Schema.ObjectId, ref: "users"},
	price: Number,
	description: String,
	category: String,
	image: String
});

module.exports = model('products', productSchema);