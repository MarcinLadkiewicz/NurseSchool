require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");
const app = express();

//Middlewares globales

app.use(cors());
app.use(express.json());
app.use("/api/auth", require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentsRoutes'));
app.use('/api/allergys', require('./routes/allergyRoutes'));
app.use('/api/pathologys', require('./routes/pathologyRoutes'));
app.use('/api/attentions', require('./routes/attentionRoutes'));


//Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "NurseSchool API running" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`> Server running on http://localhost:${PORT}`);
});
