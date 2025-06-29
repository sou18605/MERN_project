const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);
app.use("/api/expenses", require("./routes/expenseRoutes"));

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB connection error ❌:", err.message));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
