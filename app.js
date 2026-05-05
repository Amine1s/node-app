const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const blogRoutes = require("./routes/blogRoutes");

//set up exprees app

const app = express();
//conect to mongodb
const dbURI =
  "mongodb+srv://babe:test1234@cluster0.33ih9cg.mongodb.net/note-tutse?appName=Cluster0";
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("connected to database");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
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
