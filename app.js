const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const { authenticate } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const publicPath = path.join(__dirname, "public");

app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json()) смотрит за тем, что если тело запроса имеет content-type: json, он обрабляет его в json.parse
app.use(express.json());
// открываем папку для расдачи
// app.use(express.static("public"));
app.use(express.static(publicPath));

app.use("/api/contacts", authenticate, contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

app.use((err, req, res, next) => {
  const { status = 500, message = " Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
