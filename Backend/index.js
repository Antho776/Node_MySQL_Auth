const cors = require("cors")

const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const uploadsRoutes = require('./routes/uploads');

const errorController = require('./controllers/error');

global.__basedir = __dirname

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

var corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/auth', authRoutes);

app.use('/post', postsRoutes);

app.use('/uploads', uploadsRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));