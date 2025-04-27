const express = require('express')
const { dbConnection } = require('./config/config')
const app = express()
require('dotenv').config()
const cors = require('cors');

// Habilitar CORS para todas las solicitudes


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());
const PORT = process.env.PORT || 3000
const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');
const createRoles = require('./libs/initialSetup')
const userRoutes = require('./routes/userRoutes')

app.use('/api/products', productsRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 


createRoles()

dbConnection()


app.listen(PORT, () => {
  console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})
