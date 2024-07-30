// server.js
const express = require("express");
const cors = require("cors");
const globalError = require("./middleware/errMiddleware");
const ApiError = require('./utils/apiError'); 
const initializeDatabase = require('./db/initializeDatabase');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json());

// Routes
app.use(routes);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler
app.use(globalError);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
  try {
    await initializeDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
