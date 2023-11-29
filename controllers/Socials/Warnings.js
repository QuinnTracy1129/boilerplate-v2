const Entity = require("../../models/Socials/Warnings"),
  handleDuplicate = require("../../config/duplicate");

exports.save = (req, res) =>
  Entity.create(req.body)
    .then((payload) =>
      res.status(201).json({
        success: "Warning Saved Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));

exports.browse = (req, res) =>
  Entity.find(req.query)
    .populate({
      path: "createdBy",
      select: "-password",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Warnings Fetched Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "Warning Updated Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));

exports.destroy = (req, res) =>
  Entity.findByIdAndDelete(req.body._id)
    .then((payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "Warning Deleted Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
