import express from 'express';
import foo from './foo';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World! ' + foo()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
