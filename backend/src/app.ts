import express from 'express';
import cors from 'cors';

require("dotenv").config();

const routesDocker = require('./instances/routes');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routesDocker);

app.get('/', (req : express.Request, res : express.Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});