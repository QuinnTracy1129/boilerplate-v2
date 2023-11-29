const router = require("express").Router(),
  { save, update, destroy, browse, byId } = require("../controllers/Tasks"),
  { validate } = require("../middleware/jwt");

router
  .post("/save", validate, save)
  .get("/browse", validate, browse)
  .get("/byId", validate, byId)
  .put("/update", validate, update)
  .delete("/destroy", validate, destroy);

module.exports = router;
