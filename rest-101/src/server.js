const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const shortid = require("shortid")
const fs = require('fs/promises')
const path = require('path')
const dbLocation = path.resolve('src', 'data.json')

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.delete("/:id", async(req,res) => {
    const id = req.params.id;
    const data = await fs.readFile(dbLocation)
    const players = JSON.parse(data);
    let player = players.find((item) => item.id === id);

     if (!player) {
        res.status(404).json({
            message: 'player not found'
        })
    }

    const newPlayer = players.filter(item => item.id !== id)
    await fs.writeFile(dbLocation, JSON.stringify(newPlayer))

    res.status(203).send()
})
app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await fs.readFile(dbLocation)
    const players = JSON.parse(data)
    const player = players.find((item) => item.id === id);

    if (!player) {
        player = {
            ...req.body,
            id: shortid.generate()
        }
        players.push(player)
    } else {
        player.name = req.body.name;
        player.country = req.body.country;
        player.rand = req.body.rand;
    }

    await fs.writeFile(dbLocation, JSON.stringify(players))
    res.status(200).json(player)
})
app.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const data = await fs.readFile(dbLocation);
    const players = JSON.parse(data);
    console.log('player', players);


    const player = players.find((item) => item.id === id)

    if (!player) {
        res.status(404).json({
            message: 'player not found'
        })
    }

    player.name = req.body.name || player.name;
    player.country = req.body.country || player.country;
    player.rand = req.body.rand || player.rand;

    await fs.writeFile(dbLocation, JSON.stringify(players))
    console.log('find', player);


    res.status(200).json(player)
})
app.get('/:id', async (req, res) => {
    const id = req.params.id;

    const data = await fs.readFile(dbLocation);
    const players = JSON.parse(data);

    const player = players.find((item) => item.id === id)

    if (!player) {
        res.status(404).json({
            message: 'player not found'
        })
    }
    res.status(200).json(player)
})

app.post('/', async (req, res, next) => {
    const payload = {
        ...req.body,
        id: shortid.generate()
    }
    console.log('log', payload);


    const data = await fs.readFile(path.resolve(dbLocation))
    const players = JSON.parse(data);
    players.push(payload)

    await fs.writeFile(dbLocation, JSON.stringify(players))

    res.status(201).json(payload)
})

app.get('/', async (req, res) => {
    const data = await fs.readFile(dbLocation);
    const playes = JSON.parse(data);
    res.status(201).json(playes)
})

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' })
})
const port = 4000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
    console.log(`localhost:${port}`);
})

