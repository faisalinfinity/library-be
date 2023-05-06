const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./connection/connection");
const { userRoute } = require("./routes/userRoute");
const { bookRoute } = require("./routes/bookRoute");
const { orderRoute } = require("./routes/orderRoute");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/", userRoute);
app.use("/", bookRoute);
app.use("/",orderRoute)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server Running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
