import express from 'express';
import UserRouter, { USER_PATH } from './controllers/users';

const app = express();
const port = 8080; // default port to listen

const API_PATH = '/api'

app.use(API_PATH + USER_PATH, UserRouter);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});
