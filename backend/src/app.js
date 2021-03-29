require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const routes = require("./routes");

const port = process.env.BACKEND_PORT || 4000;
const dbPath = process.env.DB_PATH || "../database/database.db"; //TODO: export this variable, so that other files can use it

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(
  "/api",
  session({
    secret: "dolly is cool",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      // sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);

//Call this before calling the router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.use("/api", routes);

//Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
