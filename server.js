require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const bakuganRoutes = require('./routes/bakugan');
const gateRoutes = require('./routes/gate')
app.use('/bakugan', bakuganRoutes);
app.use('/gate', gateRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// MongoDB Connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running');
    });
  })
  .catch((err) => console.error(err));
