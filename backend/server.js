const express = require ( 'express' );
const cors = require ( 'cors' );
require('dotenv').config();

const app = express();


//Middlewares globales

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({status : 'OK', message: 'NurseSchool API running'});
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`> Server running on https://localhost:${PORT}`);
});

