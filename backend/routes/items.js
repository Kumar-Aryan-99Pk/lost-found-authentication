const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// Add item
router.post("/", auth, async (req, res) => {
  const item = await Item.create({
    ...req.body,
    user: req.user.id
  });
  res.json(item);
});

// Get all
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// 🔍 Search
router.get("/search", async (req, res) => {
  const q = req.query.q;

  const items = await Item.find({
    $or: [
      { itemName: { $regex: q, $options: "i" } },
      { type: { $regex: q, $options: "i" } }
    ]
  });

  res.json(items);
});

// ✏️ Update (ONLY OWNER)
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id) {
    return res.status(403).send("Not allowed");
  }

  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// 🗑 Delete (ONLY OWNER)
router.delete("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id) {
    return res.status(403).send("Not allowed");
  }

  await Item.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;