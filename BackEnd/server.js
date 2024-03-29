// Stephen Davis
// stephendavis.io

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const router = express();
const PORT = 9090;
const cors = require("cors");
const routeEmployees = require("./routes/Employees");

const mongoConnectionString = `mongodb+srv://dbaccess:${process.env.MONGODBPWD}@${process.env.MONGODBSERVER}/${process.env.MONGODBNAME}?retryWrites=true&w=majority`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoConnectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

router.get("/", (req, res) => {
  res.send(
    "<h1>COMP 3123 - Assignment 2</h1><h2>Stephen Davis - 101294116</h2>"
  );
});

app.use("/", router);

app.use(routeEmployees);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
