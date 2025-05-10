import {config} from 'dotenv'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import fileUpload from 'express-fileupload'

import plantRouter from '#src/routes/plants.routes.js'
import userRouter from '#src/routes/users.routes.js'
import orchardRouter from '#src/routes/orchard.routes.js'
import uploadsRouter from '#src/routes/uploads.routes.js'
import plantsOnOrchardRouter from '#src/routes/plantsOnOrchard.routes.js'
import coursesRouter from '#src/routes/courses.routes.js'
import connectDb from '#src/database/connection.js'
import { __dirname } from '#src/utils/utilsAttach.js'

config()
connectDb()

var app = express();

logger.token('error', function (req, res) {
  return req.error ? req.error.message : '';
});

// view engine setup
app.use(logger(':method :url :status :res[content-length] - :response-time ms error: :error'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/plants', plantRouter);
app.use('/users', userRouter )
app.use('/orchards', orchardRouter)
app.use('/plantsOnOrchards', plantsOnOrchardRouter)
app.use('/uploads', uploadsRouter)
app.use('/courses', coursesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: 'Error en el servidor',
    error: err,
  });
});

export default app;
