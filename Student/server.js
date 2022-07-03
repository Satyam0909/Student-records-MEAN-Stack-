let express = require('express');
const createError = require('http-errors');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyParser = require('body-Parser');
dbconfig = require('./db/database')

mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database  connected successfully !!!');
},
    error => {
        console.log('Failed to connect to the database: ' + error);
    }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
const userRoute = require('./routes/student.routes')

app.use('/endpoint', userRoute);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log('Listening on port : ' + port);
});

app.use((req, res, next) => {
    next(createError(404));
}
)

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});