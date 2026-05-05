const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const blogRoutes = require("./routes/blogRoutes");

//set up exprees app

const app = express();
//conect to mongodb
const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Mongo error:", err);
  })
  .finally(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

// rejester view engine

app.set("view engine", "ejs");

//midlleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //res.send("<p> about PAGE</p>");
  res.render("about", { title: "about" });
});

//blog routes

app.use("/blogs", blogRoutes);

//404 page

app.use((req, res) => {
  res.status(404).render("404", { title: "Eror 404" });
});
