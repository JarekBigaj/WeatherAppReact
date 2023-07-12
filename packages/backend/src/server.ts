import express, { Request, Response } from 'express';
import { createUser } from './dbConfig';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const port = 3600;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

createUser();