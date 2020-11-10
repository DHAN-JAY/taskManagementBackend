const express = require('express');
const morgan = require('morgan');

const accountsRouter = require('./routes/accountsRouting');
const projectRouter = require('./routes/projectsRouting');
const taskRouter = require('./routes/taskRouting');
const cors = require('cors');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.options('*', cors());
app.use(express.json());

// 3) ROUTES
app.use('/api/user', accountsRouter);
app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);

app.all('*', (req, res, next) => {
    res.json("Server is running");
})

module.exports = app;
