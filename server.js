const express = require('express');
const { dbConnect } = require('./src/db/dbConnect');
const { middleware } = require('./src/middleware/middleware');
require('dotenv').config();

const indexRouter = require('./src/routes/indexRouter');
const userRouter = require('./src/routes/userRouter');
const feedbackRouter = require('./src/routes/feedbackRouter');
const profileRouter = require('./src/routes/profileRouter');

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

middleware(app);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/review', feedbackRouter);
app.use('/profile', profileRouter)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
