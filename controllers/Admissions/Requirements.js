const Entity = require("../../models/Admissions/Requirements");

exports.save = (req, res) => {
  const { title, department, departmentName } = req.body;

  if (!title || !department)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Title and Department are required.",
    });

  Entity.findOne({ title, department })
    .then((requirement) => {
      if (requirement)
        return res.status(409).json({
          error: "Duplicate Entry",
          message: `[${title}] is already declared in ${departmentName}.`,
        });

      Entity.create(req.body)
        .then((payload) =>
          res.status(201).json({
            success: "Requirement Added Successfully.",
            payload,
          })
        )
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.browse = (req, res) =>
  Entity.find(req.query)
    .select("-createdAt -updatedAt -__v")
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Requirements Fetched Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) => {
  const { title, department, departmentName } = req.body;

  if (!title || !department)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Title and Department are required.",
    });

  Entity.findOne({ title, department })
    .then((requirement) => {
      if (requirement)
        return res.status(409).json({
          error: "Duplicate Entry",
          message: `[${title}] is already declared in ${departmentName}.`,
        });

      Entity.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      })
        .then((payload) => {
          if (!payload)
            return res.status(404).json({
              error: "Invalid ID.",
              message: "ID Not Found.",
            });

          res.json({
            success: "Requirement Updated Successfully.",
            payload,
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.destroy = (req, res) =>
  Entity.findByIdAndDelete(req.body._id)
    .then((payload) => {
      if (!payload)
        return res.status(404).json({
          error: "Invalid ID.",
          message: "ID Not Found.",
        });

      res.json({
        success: "Requirement Deleted Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
