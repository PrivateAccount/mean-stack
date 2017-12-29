var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

Object.assign = require('object-assign');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('combined'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
        mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    }
}

var db = null;
var dbDetails = new Object();
var ObjectID = require('mongodb').ObjectID;

mongodb.connect(mongoURL, function (err, conn) {
    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';
    console.log('Connected to MongoDB at: %s', mongoURL);
});

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/templates/:name', function (req, res) {
    res.sendFile(__dirname + '/templates/' + req.params.name);
});

app.post('/login', function (req, res) {
    db.collection('users', function (err, collection) {
        collection.findOne({
            email: req.body.email,
            password: req.body.password
        }, function (err, result) {
            res.json({
                result: result,
            });
        });
    });
});

app.post('/register', function (req, res) {
    db.collection('users').insertOne({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        ip: req.ip,
        date: Date.now()
    }, function (err, result) {
        res.json({
            result: result,
        });
    });
});

app.get('/users', function (req, res) {
    db.collection('users', function (err, collection) {
        collection.find().toArray(function (err, result) {
            res.send(result);
        });
    });
});

app.get('/user/:id', function (req, res) {
    db.collection('users', function (err, collection) {
        collection.findOne({
            _id: new ObjectID(req.params.id)
        }, function (err, result) {
            res.send(result);
        });
    });
});

app.put('/user/:id', function (req, res) {
    db.collection('users').updateOne({
        _id: new ObjectID(req.params.id)
    }, {
        $set: {
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            ip: req.ip,
            date: Date.now()
        }
    }, function (err, result) {
        res.send(result);
    });
});

app.delete('/user/:id', function (req, res) {
    db.collection('users').removeOne({
        _id: new ObjectID(req.params.id)
    }, function (err, result) {
        res.send(result);
    });
});

app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
