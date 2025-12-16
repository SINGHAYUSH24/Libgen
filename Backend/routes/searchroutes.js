const express = require("express");
const router = express.Router();
const { searchResources } = require("../controllers/searchcontrollers");
router.get("/search", searchResources);
module.exports = router;
