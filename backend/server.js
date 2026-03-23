require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");
const app = express();



app.use(cors());
app.use(express.json());
app.use("/api/auth", require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentsRoutes'));
app.use('/api/allergies', require('./routes/allergyRoutes'));
app.use('/api/pathologies', require('./routes/pathologyRoutes'));
app.use('/api/attentions', require('./routes/attentionRoutes'));
app.use('/api/nurse', require('./routes/nurseRoutes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`> Server running on http://localhost:${PORT}`);
});
