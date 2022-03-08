import { NextFunction, Request, Response, Router } from 'express';
import { Repository } from 'sequelize-typescript';

import { LinkModel } from '../db';
import { sequelize } from '../db/sequelize';
import { QueryTypes } from 'sequelize';

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

    .delete('/link/:id', (req: Request, res: Response, next: NextFunction) =>
        linkRepository.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(link => link
                ? res.json(link)
                : next({ statusCode: 404 }))
            .catch(next)
    )

    .post('/link/:id', (req: Request, res: Response, next: NextFunction) =>
        linkRepository.findByPk(req.params.id)
            .then(link => {
                link.update(req.body)
                    .then(async link => {
                        link = await link.save()
                        link
                            ? res.json(link)
                            : next({ statusCode: 404 })
                    })
                    .catch(next)
            })
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

    .get('/link/user/:username/create', (req: Request, res: Response, next: NextFunction) => {
        const SQL = "INSERT INTO links (url, text, \"isActive\", \"position\", \"userId\", \"createdAt\", \"updatedAt\")\n" +
            "SELECT 'Enter URL', 'Enter Text', false, COUNT(l.\"userId\") + 1, '1', now(), now()\n" +
            "FROM app_users\n" +
            "JOIN links l ON app_users.id = l.\"userId\"\n" +
            "WHERE username = :username RETURNING *"

        sequelize.query(SQL, {
            raw: false,
            replacements: { username: req.params.username },
            type: QueryTypes.SELECT
        })
            .then(([results, metadata]) => res.json(results))
            .catch(next)
    })

;
