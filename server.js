import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./models/index.cjs";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET;
// Session 12: only web pages served from these addresses may read
// the API's answers in a browser. A comma-separated list.

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .filter(Boolean);

if (!secret || secret.length < 32) {
  console.error("JWT_SECRET in .env must be at least 32 characters.");
  process.exit(1);
}

app.use(cors({ origin: allowedOrigins }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});

// Session 12: refuse to start when the database cannot be reached.

try {
  await db.sequelize.authenticate();
} catch (err) {
  console.error("Cannot reach the database:", err.message);
  process.exit(1);
}