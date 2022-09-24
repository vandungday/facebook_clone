const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require("./routes/user.route");
// const { readdirSync } = require("fs");
// console.log(readdirSync("./routes"));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database conected successful"))
  .catch((err) => console.log("Error connecting mongodb", err));

app.use(express.json());
app.use(cors());

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server run listening on port ${PORT}...`);
});
