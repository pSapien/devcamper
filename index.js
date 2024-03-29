const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const errorHandler = require('./middlewares/errorHandler');

const connectDb = require('./db.config');
const bootcamps = require('./bootcamps/bootcamps.router');
const courses = require('./courses/courses.router');

connectDb();

const app = express();
app.use(express.json());

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));

process.on('unhandledRejection', (err) => {
  console.error(`Server: ${err}`);
  server.close(() => process.exit(1));
});
