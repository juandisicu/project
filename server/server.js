const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const tournamentRoutes = require('./routes/tournamentRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json()); // << ESTA LÍNEA ES CLAVE

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error de conexión a MongoDB:', err));

app.use('/api/tournaments', tournamentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
