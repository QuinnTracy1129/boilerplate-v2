const jwt = require("jsonwebtoken"),
  Users = require("../models/Users"),
  restriction = require("../config/access"),
  { URL } = require("url");

const verifyToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    })
  );

exports.validate = ({ headers, originalUrl }, res, proceed) => {
  const { authorization } = headers;

  if (!authorization)
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication token is missing or invalid.",
    });

  if (!authorization.startsWith(process.env.JWT_HEADER))
    return res.status(400).json({
      error: "Invalid Token",
      message: "The provided token is not in the correct format.",
    });

  verifyToken(authorization.split(" ")[1])
    .then(({ _id, role }) =>
      Users.findById(_id)
        .select("-password")
        .then((user) => {
          // when the _id did not match anything
          if (!user)
            return res.status(404).json({
              error: "User Not Found",
              message: "The provided Credentials does not exist.",
            });

          if (!user.isActive)
            return res.status(401).json({
              error: "Unauthorized",
              message: "Account has been ceased.",
            });

          const { pathname } = new URL(originalUrl, `http://${headers.host}`),
            [endpoint, action] = pathname.split("/").filter(Boolean),
            policy = restriction[role][endpoint];

          if (policy && policy.includes(action))
            return res.status(401).json({
              error: "Unauthorized",
              message: "You cannot access this endpoint.",
            });

          res.locals.caller = { ...user._doc };
          proceed();
        })
        // when the token has invalid _id format
        .catch(() =>
          res.status(403).json({
            error: "Invalid Token",
            message: "The provided token contains invalid information.",
          })
        )
    )
    //when the token is expired or invalid
    .catch(() =>
      res.status(403).json({
        error: "Invalid Token",
        message: "The provided token is either invalid or expired.",
      })
    );
};

exports.notFound = (req, res, proceed) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  proceed(error);
};

exports.errorHandler = (err, req, res, proceed) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
