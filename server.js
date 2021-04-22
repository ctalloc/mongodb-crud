console.log("May Node be with you");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000, () => {
    console.log('listening on 3000');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('/Users/oni/Repositorios/mern-crud/' + 'index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body);
})