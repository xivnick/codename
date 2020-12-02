
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3333;

const bodyParser = require('body-parser');

const data = require('./data/data.js');
const api = require('./routes/api');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('static'));

app.use('/api', api);

app.get('/test', (req, res) => {
    return res.send({
        cards: data.cardList.cards,
    });
});

app.get('/', (req, res) => {
    return res.render('index.ejs');
});

io.on('connection', (socket) => {
    socket.emit('connection');
    console.log(`[conn] client connected: ${socket.id}`);

    socket.on('join', (name) => {
        socket.name = name;
        console.log(socket.name);
    })
});

http.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

