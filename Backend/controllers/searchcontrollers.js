const Resource = require("../model/resource");
const User=require("../model/User");
const searchResources = async (req, res) => {
  try {
    const { q, type } = req.query;

    // If no query → return all resources
    if (!q) {
      const resources = await Resource.find().sort({ createdAt: -1 });
      return res.json(resources);
    }

    let query = {};

    switch (type) {
      case "title":
        query = {
          title: { $regex: q, $options: "i" }
        };
        break;

      case "keywords":
        query = {
          keywords: { $regex: q, $options: "i" }
        };
        break;

      case "author":
        query = {
          authors: { $regex: q, $options: "i" }
        };
        break;

      case "category":
        query = {
          category: { $regex: `^${q}$`, $options: "i" }
        };
        break;

      case "year":
        if (isNaN(q)) {
          return res.status(400).json({ message: "Invalid year" });
        }
        query = {
          publication_year: Number(q)
        };
        break;

      case "availability":
        if (q === "available") {
          query = { availability: { $gt: 0 } };
        } else if (q === "unavailable") {
          query = { availability: 0 };
        } else {
          return res.status(400).json({ message: "Invalid availability filter" });
        }
        break;

      default:
        query = {};
    }

    const results = await Resource
      .find(query)
      .sort({ publication_year: -1 });

    res.status(200).json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};
const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id; 
    console.log(userId);
    const resourceId = req.params.id;
    console.log(resourceId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const alreadyBookmarked = user.bookmarks.includes(resourceId);
    if (alreadyBookmarked) {
      user.bookmarks.pull(resourceId);
    } else {
      user.bookmarks.push(resourceId);
    }
    await user.save();
    res.status(200).json({
      success: true,
      bookmarked: !alreadyBookmarked
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { searchResources,toggleBookmark };
