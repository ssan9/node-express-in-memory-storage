import express from 'express';
import foo from './foo';

const app = express();
const port = 3000;

const { router: musicRouter } = require('./router');

app.get('/', (req, res) => res.send('Hello World! ' + foo()));

app.use('/musicians', musicRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
