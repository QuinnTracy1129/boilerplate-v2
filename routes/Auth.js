const router = require("express").Router(),
  { login, upload } = require("../controllers/Auth"),
  { validate } = require("../middleware/jwt");

router
  .get("/login", login)
  //   .get("/changePassword", provideToken)
  .post("/upload", validate, upload);

module.exports = router;
