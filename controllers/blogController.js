//
const mongoose = require("mongoose");
const Blog = require("../models/blog");
//

const blog_index = (req, res) => {
  const search = req.query.search || "";
  const category = req.query.category || "";

  let query = {
    title: { $regex: search, $options: "i" },
  };

  if (category) {
    query.category = category;
  }

  Blog.find(query)
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "ALL BLOGS",
        blogs: result,
        search,
        category,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { title: "Blog not found" });
  }

  Blog.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).render("404", { title: "Blog not found" });
      }

      res.render("details", {
        blog: result,
        title: "Blog Details",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).render("404", { title: "Error" });
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "create a new blog" });
};

const blog_create_post = (req, res) => {
  // const blog = new Blog(req.body);
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    category: req.body.category,
  });

  blog
    .save()
    .then(() => res.redirect("/blogs"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to create blog");
    });
};

const delete_blog = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Delete failed" });
    });
};
// live search
const blog_live_search = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";

    let query = {
      title: { $regex: search, $options: "i" },
    };

    if (category) {
      query.category = category;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Search failed",
    });
  }
};

const blog_edit_get = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("edit", {
        title: "Edit Blog",
        blog: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/blogs");
    });
};

const blog_update = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndUpdate(id, {
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  })
    .then(() => {
      res.redirect(`/blogs/${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  delete_blog,
  blog_edit_get,
  blog_update,
  blog_live_search,
};
