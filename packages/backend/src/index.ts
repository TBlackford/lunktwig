import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import strongErrorHandler from 'strong-error-handler';
import { json } from 'body-parser';

import { sequelize } from './db/sequelize';
import { userRouterFactory } from './controllers/user.controller';
import { linkRouterFactory } from './controllers/link.controller';
import { userRepository, linkRepository } from './db/repositories';

export const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
app.use(json());

app.use(userRouterFactory(userRepository));
app.use(linkRouterFactory(linkRepository));

app.use(strongErrorHandler({
    debug: true,
}));


const port = process.env.PORT || 8080;

(async () => {
    await sequelize.sync();

    createServer(app)
        .listen(port, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server listen on port ${port}`)
        });
})();

