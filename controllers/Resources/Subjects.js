const Entity = require("../../models/Resources/Subjects"),
  handleDuplicate = require("../../config/duplicate");

exports.save = (req, res) => {
  const { title, description, gradeLvl, departmentName } = req.body;

  if (!title || !description)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Title and Description are required.",
    });

  Entity.findOne({ title, gradeLvl })
    .then((subject) => {
      if (subject)
        return res.status(409).json({
          error: "Duplicate Entry",
          message: `[${title}] is already declared in ${departmentName}.`,
        });

      Entity.create(req.body)
        .then((payload) =>
          res.status(201).json({
            success: "Subject Added Successfully.",
            payload,
          })
        )
        .catch((error) =>
          res.status(400).json({ error: handleDuplicate(error) })
        );
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
        success: "Subjects Fetched Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.update = (req, res) => {
  const { title, description, gradeLvl, departmentName } = req.body;

  if (!title || !description)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Title and Description are required.",
    });

  Entity.findOne({ title, gradeLvl })
    .then((subject) => {
      if (subject)
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
            success: "Subject Updated Successfully.",
            payload,
          });
        })
        .catch((error) =>
          res.status(400).json({ error: handleDuplicate(error) })
        );
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
        success: "Subject Deleted Successfully.",
        payload,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
