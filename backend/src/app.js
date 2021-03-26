require("dotenv").config()

const express = require("express")
const session = require("express-session")
const cors = require("cors");

const app = express()
const routes = require("./routes");


const port = process.env.BACKEND_PORT || 4000
const dbPath = process.env.DB_PATH || "../database/database.db" //TODO: export this variable, so that other files can use it


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(express.json())
  
//Setup routes
app.use("/api", routes);


//Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})