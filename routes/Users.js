const router = require("express").Router(),
  { find, login, save } = require("../controllers/Users"),
  { validate } = require("../middleware/jwt");

router.get("/find", validate, find).get("/login", login).post("/save", save);

module.exports = router;
