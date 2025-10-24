const express = require('express');
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
const router = express.router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors())
app.use(globalMiddleware)
app.use(router)

app.use((req, res, next) => {
    // res.status(404).send('<h1> Not found </h1>')
    const error = new Error('404 not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    console.log('Error', error);

    if (error.status) {
        return res.status(error.status).send(error.message)
    }

    res.status(500).send('something went wrong')
})

router.get('/', localMiddleare, (req, res) => {
    // const error = new Error('bad request')
    // error.status = 400;
    // throw error
    fs.readFile('./page/index.html', (err, data) => {
        if (err) {
            console.log('Error', err);
            res.send('<h1>something went wrong</h1>')

        } else {
            res.writable(data)
            res.end()
        }
    })
})

function middlewareSignature(req, res, next) {

}

function localMiddleare(req, res, next) {
    console.log('local middleware');
    next()
}
function globalMiddleware(req, res, next) {
    console.log(`${req.method} - ${req.url}`);
    console.log('global middleware');
    next()
}
app.listen(4000, () => {
    console.log(`server is listening on port 4000`);
})

