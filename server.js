const app = require("./app");
const mongoose = require("mongoose");

// находит файл .env считывает его и добавляет в переменные окружения
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// process.exit(1) закрывает запущенные процессы. (1) это статус ошибки

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
