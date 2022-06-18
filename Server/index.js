const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;

const uri =
  "mongodb+srv://root:root@cluster0.2x0wa.mongodb.net/Invoice?retryWrites=true&w=majority";
global.db = mongoose.createConnection(uri);
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const invoiceRoute = require("./Routes/invoiceRoutes");
app.use("/invoice", invoiceRoute);

app.listen(port, () => console.log("listening on http://localhost:4000"));
