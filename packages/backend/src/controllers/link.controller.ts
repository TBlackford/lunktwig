import { NextFunction, Request, Response, Router } from 'express';
import { Repository } from 'sequelize-typescript';

import { LinkModel } from '../db';

export const linkRouterFactory = (
        linkRepository: Repository<LinkModel>,
    ) => Router()

        .get('/link', (req: Request, res: Response, next: NextFunction) =>
            linkRepository.findAll()
                .then(links => res.json(links))
                .catch(next)
        )

        .get('/link/:id', (req: Request, res: Response, next: NextFunction) =>
            linkRepository.findByPk(req.params.id)
                .then(link => link
                    ? res.json(link)
                    : next({ statusCode: 404 }))
                .catch(next)
        )

        .post('/link', (req: Request, res: Response, next: NextFunction) =>
            linkRepository.create(req.body)
                .then(link => res.json(link))
                .catch(next)
        )

;
