console.log("May Node be with you");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { Db } = require('mongodb');

MongoClient.connect('mongodb+srv://grogu:pa55w0rd@cluster0.w04ud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to db');

    const db = client.db('sw-quotes');

    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs')

    app.listen(3000, () => {
        console.log('listening on 3000');
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static('public'));

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', { quotes: results})
            })
            .catch(error => console.error(error));
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.put('/quotes', (req,res) => {
        quotesCollection.findOneAndUpdate(
            {name:'Yoda'},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
       .then (result => {
           res.json('Success')
       })
        .catch(error => console.error(error))
    })
    app.delete('/quotes', (req,res) => {
        quotesCollection.deleteOne(
            {name: req.body.name},
        )
        .then(result => {
            res.json(`Deleted Darth Vader's quote`)
        })
        .catch(error =>console.error(error))
    })
});

