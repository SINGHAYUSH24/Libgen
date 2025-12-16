const Resource = require("../model/resource");
const fs = require("fs");

const uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const resource = new Resource({
      title: req.body.title,
      authors: req.body.authors
        ? req.body.authors.split(",").map(a => a.trim())
        : [],
      category: req.body.category,
      keywords: req.body.keywords
        ? req.body.keywords.split(",").map(k => k.trim())
        : [],
      publication_year: Number(req.body.publication_year),
      availability: Number(req.body.availability),
      pdf_path: req.file.path
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      category: req.body.category,
      publication_year: Number(req.body.publication_year),
      availability: Number(req.body.availability),
      authors: req.body.authors
        ? req.body.authors.split(",").map(a => a.trim())
        : [],
      keywords: req.body.keywords
        ? req.body.keywords.split(",").map(k => k.trim())
        : []
    };
    if (req.file) {
      updateData.pdf_path = req.file.path;
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({
      message: "Resource updated successfully",
      data: updatedResource
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (fs.existsSync(resource.pdf_path)) {
      fs.unlinkSync(resource.pdf_path);
    }

    await resource.deleteOne();
    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadResource,
  getAllResources,
  updateResource,
  deleteResource
};
