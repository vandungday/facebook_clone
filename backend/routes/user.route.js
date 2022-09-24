const express = require("express");
const { home, books } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", home);

router.get("/books", books);

module.exports = router;
