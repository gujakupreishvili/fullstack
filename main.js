const express = require("express");
const path = require("path");
const { readFile } = require("./utils");
const apiRouter = require("./api");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const users = await readFile("users.json");
    res.render("pages/home", { users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/add/users", async (req, res) => {
  try {
    const users = await readFile("users.json");
    res.render("pages/add", { users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/edit/users", async (req, res) => {
  try {
    const users = await readFile("users.json");
    res.render("pages/edit", { users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
