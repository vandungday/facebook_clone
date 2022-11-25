const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/user.route');

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database conected successful'))
  .catch((err) => console.log('Error connecting mongodb', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors());

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Server run listening on port ${PORT}...`);
});
