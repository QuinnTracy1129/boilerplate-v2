const Entity = require("../../models/Socials/Announcements"),
  handleDuplicate = require("../../config/duplicate"),
  bulkWrite = require("../../config/bulkWrite");

exports.save = (req, res) =>
  Entity.create(req.body)
    .then(({ _id }) =>
      Entity.findById(_id)
        .populate({
          path: "createdBy",
          select: "-password",
        })
        .then((payload) =>
          res.status(201).json({
            success: "Announcement Added Successfully.",
            payload,
          })
        )
        .catch((error) =>
          res.status(400).json({ error: handleDuplicate(error) })
        )
    )
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));

exports.browse = (req, res) =>
  Entity.find(req.query)
    .populate({
      path: "createdBy",
      select: "-password",
    })
    .sort({ isPublished: 1, createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Announcement Fetched Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
    populate: {
      path: "createdBy",
      select: "-password",
    },
  })
    .then((payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "Announcement Updated Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));

exports.destroy = (req, res) =>
  bulkWrite(
    req,
    res,
    Entity,
    "Announcements Deleted Successfully.",
    "deleteOne"
  );
