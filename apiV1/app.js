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

app.get("/recom.json", (req, res) => {
  res.sendFile(__dirname + "/recom.json");
});

const healthIssues = [
  "diabetes",
  "hypertension",
  "celiac_disease",
  "lactose_intolerance",
  "gout",
  "heart_disease",
  "osteoporosis",
  "ibs",
];

const foodCategories = [
  "fruits",
  "vegetables",
  "grains",
  "proteins",
  "dairy",
  "beverages",
  "nuts_and_seeds",
  "legumes",
  "herbs_and_spices",
];

// Endpoint to get health issues
app.get("/health-issues", (req, res) => {
  res.json(healthIssues);
});

// Endpoint to get food categories
app.get("/food-categories", (req, res) => {
  res.json(foodCategories);
});

// Endpoint to get recommendations based on health issues
app.get("/recommendations", (req, res) => {
  const { health_issues } = req.query;
  // Your logic to handle recommendations based on health_issues
  res.json({
    recommended: [
      {
        category: "fruits",
        items: [
          {
            name: "berries",
            benefits: "Low glycemic index, high in antioxidants",
          },
          {
            name: "citrus fruits",
            benefits: "High in vitamin C, may help lower blood pressure",
          },
        ],
      },
      // Add more categories and items as needed
    ],
    restricted: [
      { name: "sugary foods", reason: "Can cause rapid spikes in blood sugar" },
      { name: "high-sodium foods", reason: "Can increase blood pressure" },
    ],
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
