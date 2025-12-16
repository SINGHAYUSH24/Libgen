const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {uploadResource,getAllResources,updateResource,deleteResource} = require("../controllers/resourcecontrollers");
router.post("/upload",upload.single("pdf"),uploadResource);
router.get("/view",getAllResources);
router.put("/update/:id",upload.single("pdf"),updateResource);
router.delete("/:id",deleteResource);
module.exports = router;
