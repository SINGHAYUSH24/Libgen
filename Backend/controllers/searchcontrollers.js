const Resource = require("../model/resource");
const searchResources = async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) {
        try {
            const resources = await Resource.find().sort({ createdAt: -1 });
            res.json(resources);
            return;
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    let query = {};
    switch (type) {
      case "keywords":
      default:
        query = {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { keywords: { $regex: q, $options: "i" } },
            { authors: { $regex: q, $options: "i" } }
          ]
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
    }

    const results = await Resource.find(query).sort({ publication_year: -1 });

    res.status(200).json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = { searchResources };
