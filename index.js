const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connectDb = require('./db.config');
const bootcamps = require('./router/bootcamps.router');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));

process.on('unhandledRejection', (err) => {
  console.error(`Server: ${err}`);
  server.close(() => process.exit(1));
});
