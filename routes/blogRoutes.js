const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");

// middleware (temporary)
const requireAuth = (req, res, next) => {
  // future login system
  next();
};

// READ all blogs
router.get("/", blogController.blog_index);

// CREATE blog page
router.get("/create", blogController.blog_create_get);

// CREATE blog (POST)
router.post("/", requireAuth, blogController.blog_create_post);
// creat serch blog
router.get("/search/live", blogController.blog_live_search);

// DETAILS
router.get("/:id", blogController.blog_details);

// EDIT page
router.get("/:id/edit", blogController.blog_edit_get);

// UPDATE blog
router.put("/:id", blogController.blog_update);

// DELETE blog
router.delete("/:id", blogController.delete_blog);

const blog_edit_get = (req, res) => {
  res.send("Edit page");
};

const blog_update = (req, res) => {
  res.send("Update blog");
};

module.exports = router;
