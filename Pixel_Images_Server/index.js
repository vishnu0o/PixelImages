const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();

const router = require("./routes");
app.use(express.json());
app.use(cors());

app.use("/", router);

const PORT = process.env.MONGODB_PORT;

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
