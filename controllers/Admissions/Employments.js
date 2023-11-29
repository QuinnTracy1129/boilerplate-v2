const Entity = require("../../models/Admissions/Employments"),
  Users = require("../../models/Users");

exports.save = (req, res) => {
  const { user, employment } = req.body;

  Users.findByIdAndUpdate(employment.user, user, { new: true })
    .select("-password")
    .then((_user) => {
      Entity.create(employment)
        .then((_employment) => {
          var success =
            "The form has been submitted; please await validation by the principal.";

          if (!employment.isPublished) success = "Form draft saved.";

          res.status(201).json({
            success,
            payload: {
              user: _user,
              employment: _employment,
            },
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.update = (req, res) => {
  const { user, employment } = req.body;

  Users.findByIdAndUpdate(employment.user, user, {
    new: true,
  })
    .select("-password")
    .then((_user) => {
      Entity.findByIdAndUpdate(employment._id, employment, { new: true })
        .then((_employment) => {
          var success =
            "The form has been submitted; please await validation by the principal.";

          if (!employment.isPublished) success = "Form draft updated.";

          res.json({
            success,
            payload: {
              user: _user,
              employment: _employment,
            },
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
