const http = require('http');
const express = require('express');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/todos', (req, res) => {
    console.log('TODO-API HTTP Get /todos');
    const todos = {
        'data': [
            {
                'attributes':
                {
                    'name': 'Fix the car',
                    'done': false
                }
            },
            {
                'attributes':
                {
                    'name': 'Feed the cat',
                    'done': true
                }
            },
            {
                'attributes':
                {
                    'name': 'Eat a doughnut',
                    'done': false
                }
            },
        ]
    }

    res.send(JSON.stringify(todos));
});

http
    .createServer(app)
    .listen(8080, (err) => {
        console.log(err ? err.message : 'listening on 8080');
    });

