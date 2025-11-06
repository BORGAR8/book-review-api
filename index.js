const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const generalRoutes = require("./routes/general");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");

app.use(express.json());
app.use(cors());

// routes
app.use("/", generalRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
