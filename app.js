const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // Load environment variables from .env
const { connectToDatabase } = require("./src/config/database");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
// Load environment variables from .env file
dotenv.config();

// Import routes and controllers
const userRoutes = require("./src/modules/user/userRoute");
const carRoutes = require("./src/modules/car/carRoute");

const app = express();

const port = process.env.PORT || 3000;

connectToDatabase();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
// all routes
app.use("/car", carRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on:${port}`);
});
