const Entity = require("../models/Tasks");

exports.save = ({ headers }, res) => {
  const { custombody = "{}" } = headers;

  Entity.create({ ...JSON.parse(custombody), createdBy: res.locals.caller._id })
    .then((payload) =>
      res.status(201).json({
        success: "Task Created Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.browse = (req, res) => {
  const query = { ...req.query };

  if (query.hasOwnProperty("deleted")) {
    if (query.deleted === "true") {
      query.deletedAt = { $exists: true };
    } else {
      query["$or"] = [{ deletedAt: { $exists: false } }, { deletedAt: "" }];
    }
    delete query.deleted;
  }

  Entity.find(query)
    .select("-__v")
    .populate({
      path: "createdBy",
      select: "email",
    })
    .sort({ isDone: 1, createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Tasks Fetched Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.byId = (req, res) =>
  Entity.findById(req.query._id)
    .populate({
      path: "createdBy",
      select: "email",
    })
    .then((payload) =>
      res.json({
        success: "Task Found Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = ({ headers }, res) => {
  const { custombody = "{}" } = headers;

  const body = JSON.parse(custombody);

  Entity.findByIdAndUpdate(body._id, body, {
    new: true,
  })
    .then((payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "Task Updated Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.destroy = async ({ headers }, res) => {
  try {
    const { custombody = "{}" } = headers;

    const payload = await Entity.findById(JSON.parse(custombody)._id);

    if (!payload) throw new Error("ID Not Found.");
    if (payload.deletedAt) throw new Error("Task is already deleted.");

    await Entity.findByIdAndUpdate(payload._id, { deletedAt: new Date() });

    res.json({ success: "Task Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
