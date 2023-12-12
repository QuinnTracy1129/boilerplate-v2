const Entity = require("../models/Users"),
  handleDuplicate = require("../config/duplicate"),
  generateToken = require("../config/generateToken");

exports.find = ({ query }, res) =>
  Entity.find(query)
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

exports.login = (req, res) => {
  const { email, password } = req.query;

  if (!email || !password)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Email and Password are required.",
    });

  Entity.findOne({ email })
    .then(async (item) => {
      if (!item)
        return res.status(404).json({
          error: "User Not Found",
          message: "The provided Credentials does not exist.",
        });

      if (!item.isActive)
        return res.status(400).json({
          error: "Account Deactivated",
          message: "Contact the Admnistrator",
        });

      if (!(await item.matchPassword(password)))
        return res.status(400).json({
          error: "Invalid Credentials",
          message: "The provided Credentials does not match.",
        });

      res.json({
        success: "Login Success",
        payload: generateToken({ _id: item._id, role: item.role }),
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.save = (req, res) => {
  const { body } = req.headers;
  Entity.create(JSON.parse(body))
    .then((payload) =>
      res.status(201).json({
        success: "Registered Successfully, You may now proceed to Login",
        payload: {
          email: payload.email,
          _id: payload._id,
        },
      })
    )
    .catch((error) => res.status(400).json({ error: handleDuplicate(error) }));
};
