const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/test", (req, res) => {
  res.send({
    test: "this works",
  });
});
// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
