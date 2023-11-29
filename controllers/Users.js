const Entity = require("../models/Users"),
  handleDuplicate = require("../config/duplicate"),
  handleQuery = require("../config/query"),
  bulkWrite = require("../config/bulkWrite");

const baseUpdate = ({ body }, res, message) =>
  Entity.findByIdAndUpdate(body._id, body, {
    new: true,
  })
    .select("-password -__v")
    .then((payload) => {
      if (payload) {
        res.json({
          success: message,
          payload,
        });
      } else {
        res.status(404).json({
          error: "ID Not Found",
          message: "The provided ID does not exist.",
        });
      }
    })
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));

exports.find = ({ query }, res) =>
  Entity.find(handleQuery(query))
    .select("-__v -password")
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Users Found Successfully",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Users Updated Successfully");
  } else {
    baseUpdate(req, res, "User Updated Successfully");
  }
};

exports.save = ({ body }, res) =>
  Entity.create(body)
    .then((_payload) => {
      const { employment, enrollment } = body;

      if (employment) {
        console.log("employee");
      }

      if (enrollment) {
        console.log("student");
      }

      res.status(201).json({
        success: "Registration Success, Proceed to Login",
        payload: { ..._payload._doc, password: undefined },
      });
    })
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));
