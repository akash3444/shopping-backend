const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'users'},
	products: [{
		product: { type: Schema.ObjectId, ref: 'products'}, 
		quantity: Number,
		total: Number
	}],
	cartTotal: Number
});

module.exports = model('carts', cartSchema);