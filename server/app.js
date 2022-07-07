const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.js');

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// routes
app.use('/api', authRoutes);

const httpServer = require('http').createServer(app);

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Database connected');
    }
    httpServer.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server running`);
      }
    });
  }
);
