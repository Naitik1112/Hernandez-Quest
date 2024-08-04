const express = require('express');
const path = require('path');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitise = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const wantedRouter = require('./routes/wantedRoute');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const tipRouter = require('./routes/tipRoutes');
const newsRouter = require('./routes/newsRoutes');
const careerRouter = require('./routes/careerRoutes');
const publishRouter = require('./routes/publishRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 1) MIDDLEWARES
// app.use(helmet());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = ratelimit({
  max: 20,
  windownMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again after one hour!',
});
app.use('/api', limiter);

app.use(express.json());

app.use(cookieParser());

// data sanitization against nosql query injection
app.use(mongosanitise());

// data sanitization againstXSS
app.use(xss());

// app.use(cookieparser);

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/tip', tipRouter);
app.use('/api/users', userRouter);
app.use('/api/wanted', wantedRouter);
app.use('/api/news', newsRouter);
app.use('/api/career', careerRouter);
app.use('/api/publish', publishRouter);

// if user enters undefined route
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server.`, 404));
});

app.use(globalError);

module.exports = app;

//  jo route ma / thi start thatu hoi to 127.0.0.1:3100 pchi thi aave and jo / no hoi to ema j continue thay
