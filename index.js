const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();
const corsMiddleware = cors();
const port = process.env.PORT || 4000;
const authRouter = require('./auth/router')
const userRouter = require('./user/router');
const auth = require('./auth/middleware');
const Sse = require('json-sse');
const roomFactory = require('./room/router');
const Room = require('./room/model')

app.use(corsMiddleware);
app.use(jsonParser);
app.use(authRouter);
app.use(userRouter);

const stream = new Sse();

const roomRouter = roomFactory(stream);

app.use(roomRouter);

app.get('/stream', async (req, res, next) => {
    const rooms = await Room.findAll()
    const string = JSON.stringify(rooms);
    stream.updateInit(string);
    stream.init(req, res);
})

app.get('/test', auth, (req, res, next) => {
    res.send('Test route from index.js is working');
});

app.listen(port, () => console.log(`Listening on port ${port}`));