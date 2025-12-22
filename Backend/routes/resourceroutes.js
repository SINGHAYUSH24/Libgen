const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const path=require("path");
const fs=require("fs");
const Resource=require("../model/resource");
const {uploadResource,getAllResources,updateResource,deleteResource,getAdminStats,getAllUsers} = require("../controllers/resourcecontrollers");
const {insert,get}=require("../controllers/logcontrollers");
const Download=require("../model/download");
router.post("/upload",upload.single("pdf"),uploadResource);
router.post("/log",insert);
router.get("/view",getAllResources);
router.get("/stats",getAdminStats);
router.get("/users/",getAllUsers);
router.put("/update/:id",upload.single("pdf"),updateResource);
router.delete("/:id",deleteResource);
router.get("/get",get);
router.get("/download/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const filePath = path.resolve(__dirname, "../", resource.pdf_path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    let download = await Download.findOne({ book: resource._id });
    if (download) {
      download.count = (download.count || 0) + 1;
      await download.save();
    } else {
      await Download.create({ book: resource._id, count: 1 });
    }

    res.download(filePath, `${resource.title}.pdf`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/downloads/all", async (req, res) => {
  try {
    const resources = await Resource.find({});

    const resourcesWithDownloads = await Promise.all(
      resources.map(async (r) => {
        const downloadDoc = await Download.findOne({ book: r._id });
        return {
          _id: r._id,
          title: r.title,
          authors: r.authors,
          publication_year: r.publication_year,
          downloadCount: downloadDoc ? downloadDoc.count : 0,
        };
      })
    );

    res.json(resourcesWithDownloads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
