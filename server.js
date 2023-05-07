const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000;

//app.use('/', require('./routes'));

app.listen(process.env.port || port);
console.log('Web Server is listening at port '+ (process.env.port || port));

app.get('/', (req, res) => {
    res.sendFile('/Users/jatsi/source/repos/CSE341-node' + '/index.html')
})

app.post('/contacts', (req, res) => {
    console.log('Hellooooooooooooooooo!')
  })