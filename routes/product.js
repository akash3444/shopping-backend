const router = require("express").Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const productsController = require("../controllers/product");


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		const filename = `${Date.now()}-${file.originalname}`
		req.image = filename;    
		console.log("FILE", filename)
		cb(null, filename);
	}
});

const fileFilter = (req, file, cb) => {
	switch(file.mimetype) {
		case "image/png":
		case "image/jpeg":
		case "image/jpg":
				 		cb(null, true);
				 		break;
		default: cb('Supported types: png, jpeg or jpg', false)
	}
}

const upload = multer({
	storage,
	fileFilter
})

router.get('/products', auth, productsController.getProducts);
router.get('/product/:id', auth, productsController.getProduct);
router.post('/products', auth, upload.single('image'), productsController.addProduct);
router.put('/products/:id', auth, upload.single('image'), productsController.updateProduct);
router.delete('/products/:id', auth, upload.single('image'), productsController.deleteProduct);


module.exports = router;
