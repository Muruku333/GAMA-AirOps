const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const status = require("./src/helpers/Response");

dotenv.config();
const { APP_PORT } = process.env;
const app = express();

// Middleware to parse incoming JSON data ==================================
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File Logger for all access ----------------------------------------------
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
// app.use(morgan("dev"));    // logger on console window --------------------------------

// Configuration for CORS Origin ------------------------------------------------------
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.14.121:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
//  app.use(cors("*"));       // To allow all orgins =============================

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Backend is running well",
  });
});

app.use("/auth",
   require("./src/routes/auth"));
   
app.use(
  "/api",
  require("./src/routes/users"),
  require("./src/routes/masters/operator"),
  require("./src/routes/masters/aircraft_model"),
  require("./src/routes/masters/aircraft"),
  require("./src/routes/masters/country"),
  require("./src/routes/masters/city"),
  require("./src/routes/masters/delay_category"),
  require("./src/routes/masters/delay_explanation"),
  require("./src/routes/masters/crew_training_document_master"),
  require("./src/routes/masters/hotel")
);

app.all("*", (req, res) => {
  return status.ResponseStatus(res, 404, "Endpoint Not Found");
});

app.listen(APP_PORT, () => {
  console.log(`GAMA AirOps server listening at http://localhost:${APP_PORT}`);
});
