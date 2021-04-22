console.log("May Node be with you");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://grogu:pa55w0rd@cluster0.w04ud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to db');
    const db = client.db('sw-quotes')
    app.listen(3000, () => {
        console.log('listening on 3000');
    });

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.sendFile('/Users/oni/Repositorios/mongodb-crud/' + 'index.html')
    })

    app.post('/quotes', (req, res) => {
        console.log(req.body);
    })
});

