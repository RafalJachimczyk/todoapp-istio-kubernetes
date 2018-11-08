const http = require('http');
const express = require('express');

const app = express();

app.use('/todos', (req, res) => {

    const todos = {
        'data': [
            {
                'attributes': [
                    {
                        'name': 'Fix the car',
                        'done': false
                    }
                ]
            },
            {
                'attributes': [
                    {
                        'name': 'Feed the cat',
                        'done': false
                    }
                ]
            },
            {
                'attributes': [
                    {
                        'name': 'Eat a doughnut',
                        'done': false
                    }
                ]
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

