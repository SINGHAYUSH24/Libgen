const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const path=require("path");
const fs=require("fs");
const Resource=require("../model/resource");
const {uploadResource,getAllResources,updateResource,deleteResource,getAdminStats,getAllUsers} = require("../controllers/resourcecontrollers");
const {insert,get}=require("../controllers/logcontrollers");
router.post("/upload",upload.single("pdf"),uploadResource);
router.post("/log",insert);
router.get("/view",getAllResources);
router.get("/stats",getAdminStats);
router.get("/users/",getAllUsers);
router.put("/update/:id",upload.single("pdf"),updateResource);
router.delete("/:id",deleteResource);
router.get("/get",get);
router.get("/download/:id", async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }
  const filePath = path.resolve(__dirname, "../", resource.pdf_path);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }
  res.download(filePath, `${resource.title}.pdf`);
});
module.exports = router;
