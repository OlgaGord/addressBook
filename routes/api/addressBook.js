const router = require("express").Router();
const addressBookController = require("../../controllers/addressBook");

router.get("/", (req, res) => {
	const result = addressBookController.allAddresses(req, res);
	// res.send(result);
	return result;
});

router.post("/addAddress/", (req, res) => {
	const result = addressBookController.addAddress(req, res);
	return result;

})

module.exports = router;
