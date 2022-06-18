const express = require("express");
const router = express.Router();
const invoiceController = require("../Controller/invoiceController");

router.get("/get", invoiceController.home);
router.post("/add", invoiceController.insert);
router.delete("/delete/:id", invoiceController.delete);
router.put("/update/:id", invoiceController.update);
router.post("/get/:id", invoiceController.getById);
router.put("/update/:id", invoiceController.pending);

module.exports = router;
