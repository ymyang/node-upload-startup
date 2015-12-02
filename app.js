/**
 * Created by yang on 2015/6/5.
 */
const TAG = '[app]';
var http = require('http');
var app = require('express')();
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');
var morgan = require('morgan');

var routes = require('./routes');

app.use(timeout('60s'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.disable('x-powered-by');

// routes
app.use('/', routes);

var port = 3000;
var server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(TAG, bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(TAG, bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(TAG, 'Listening on ', bind);
}

process.on("uncaughtException", function (err) {
    console.error(TAG, 'uncaughtException:', err);
});
