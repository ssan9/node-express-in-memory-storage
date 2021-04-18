const express = require('express');

const { foo } = require('./foo');

const app = express();
const port = 3000;

const { router: musicRouter } = require('./router');

app.get('/', (req, res) => res.send('Hello World! ' + foo()));

// mounting the router as middleware at path /musicians
app.use('/musicians', musicRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
