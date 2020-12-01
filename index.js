const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

const bodyParser = require('body-parser');

const data = require('./data/data.js');
const api = require('./routes/api');

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use('/api', api);

app.get('/test', (req, res) => {
    return res.send({
        cards: data.cardList.cards,
    });
});

app.get('/', (req, res) => {
    return res.render('index.ejs');
});



app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

