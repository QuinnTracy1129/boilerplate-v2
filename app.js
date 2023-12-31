const express = require("express"),
  app = express(),
  path = require("path"),
  http = require("http"),
  { Server } = require("socket.io"),
  cors = require("cors"),
  whitelisted = require("./middleware/whitelist"),
  whitelist = require("./config/whitelist"),
  { red, green } = require("colorette"),
  multer = require("multer");

require("dotenv").config();

require("./config/db")()
  .then(() => {
    const corsConfig = {
      origin: whitelist, // Do not use wildcard
      methods: ["GET", "POST", "PUT", "DELETE"], // List only available methods
      credentials: true, // Must be set to true for jwt
      allowedHeaders: [
        "Origin",
        "Content-Type",
        "X-Requested-With",
        "Accept",
        "Authorization",
      ], // Allowed Headers to be received
    };

    // Comment when client and server are joined in deployment
    app.use(cors(corsConfig)); // Pass configuration to cors

    // Used to receive json and form-data in req.body
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(multer({ storage: multer.memoryStorage() }).any());

    // Uncomment when deployed to disable calls from postman
    // Only use when client and server are at separate deployments
    // app.use(whitelisted);

    // Routes
    require("./routes")(app);

    const server = http.createServer(app);

    const port = process.env.PORT || 5001; // Dynamic port for deployment
    server.listen(port, () => {
      console.log(green(`[Server] running on port: ${port}`));
    });

    server.on("error", (error) =>
      console.log(red(`[Server] ${error.message}`))
    );
  })
  .catch((err) => {
    console.log(err);
  });
