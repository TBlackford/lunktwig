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

        .get('/link/:id/disable', (req: Request, res: Response, next: NextFunction) => {
            linkRepository.findByPk(req.params.id)
                .then(link => {
                    link.update({ isActive: false })
                        .then(async link => {
                            link = await link.save()
                            link
                                ? res.json(link)
                                : next({ statusCode: 404 })
                        })
                        .catch(next)
                    })
                .catch(next)
        })

        .get('/link/:id/enable', (req: Request, res: Response, next: NextFunction) => {
            linkRepository.findByPk(req.params.id)
                .then(link => {
                    link.update({ isActive: true })
                        .then(async link => {
                            link = await link.save()
                            link
                                ? res.json(link)
                                : next({ statusCode: 404 })
                        })
                        .catch(next)
                })
                .catch(next)
        })

        .post('/link', (req: Request, res: Response, next: NextFunction) =>
            linkRepository.create(req.body)
                .then(link => res.json(link))
                .catch(next)
        )

;
