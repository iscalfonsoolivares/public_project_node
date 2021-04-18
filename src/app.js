const dbConn = require('./db-conn');
const createError = require('http-errors');
const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080;

// Settings

app.set('trust proxy', true);

// Middleware

app.use(logger('common'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

//require('./routes/pages')(app);
require('./routes/auth')(app);
//require('./routes/auth-cookie')(app);
//require('./routes/todo')(app);
//require('./routes/uploads')(app);

// Error heandlears

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {  
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ message: err.message })
});

// Connections

let server = null;

dbConn.connect(function(err) {
  if (err) throw err;
  console.log('Database Connected!');

  dbConn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Testing DB connection, 1 + 1 =: ', results[0].solution);
  });

  server = app.listen(port, function () {
    console.log('Example app listening on port 8080!, in ' + process.env.NODE_ENV + ' mode')
  })

});

// Desconect

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
  // NOTE: server.close is for express based apps
  // If using hapi, use `server.stop`

  dbConn.end();

  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
		}
		process.exit();
  })
}
