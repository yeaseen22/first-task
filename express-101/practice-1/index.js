const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('get request')
})
app.post('/', (req, res) => {
    const player = {
        ...req.params
    }
    if (!player) {
        res.json('you send nothing')
    }
    res.status(201).json(player)
})

app.get('/hello', (req, res) => {
    res.send('get request')
})
app.get('/send', (req, res) => {
    res.send('get request')
})

app.listen(4000, () => {
    console.log('server is running');
})
