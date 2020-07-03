var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var jogadoresRouter = require('./routes/jogadores');
var torneiosRouter = require('./routes/torneios');
var fasesRouter = require('./routes/fases');
var partidasRouter = require('./routes/partidas');
var equipasRouter = require('./routes/equipas');
var curiosidadesRouter = require('./routes/curiosidades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var cors = require('cors')
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'Content-Type', 'DNT', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'User-Agent', 'X-Requested-With', 'Content-Length']
}
app.use(cors(corsOpts))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/jogadores', jogadoresRouter);
app.use('/torneios', torneiosRouter);
app.use('/fases', fasesRouter);
app.use('/partidas', partidasRouter);
app.use('/equipas', equipasRouter);
app.use('/curiosidades', curiosidadesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
