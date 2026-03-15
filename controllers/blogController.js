//
const mongoose = require("mongoose");
const Blog = require("../models/blog");
//

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "ALL BLOGS", blogs: result });
    })
    .catch(console.log());
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("details", { blog: result, title: " detailes" });
      })
      .catch((err) => {
        res.status(404).render('404', {title: 'Blog not found'})
      });
//   const id = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).render("404", { title: "Blog not found" });
//   }

//   Blog.findById(id)
//     .then((result) => {
//       if (!result) {
//         return res.status(404).render("404", { title: "Blog not found" });
//       }

//       res.render("details", { blog: result, title: "Blog Details" });
//     })
//     .catch(console.log);
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "create a new blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch(console.log());
};

const delete_blog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch(console.log());
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  delete_blog,
};
