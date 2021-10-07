const router = require("express").Router();
const cartController = require("../controllers/cart");
const auth = require("../middleware/auth");

router.get('/carts', auth, cartController.getCart);
router.post('/carts', auth, cartController.addToCart);


module.exports = cart;