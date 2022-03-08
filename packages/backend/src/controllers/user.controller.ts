import { NextFunction, Request, Response, Router } from 'express';
import { Repository } from 'sequelize-typescript';

import { AppUserModel } from '../db/';
import { linkRepository } from '../db/repositories';
import { LinkPayload } from '@common/models';

export const userRouterFactory = (
        userRepository: Repository<AppUserModel>,
    ) => Router()

    .get('/users', (req: Request, res: Response, next: NextFunction) =>
        userRepository.findAll({ include: [linkRepository] })
            .then(users => res.json(users))
            .catch(next)
    )

    .get('/users/:username', (req: Request, res: Response, next: NextFunction) =>
        userRepository.findOne({
            where: { username: req.params.username },
            include: [linkRepository],
            attributes: ['firstName', 'lastName', 'username', 'email', 'id']
        })
            .then(user => user
                ? res.json(user)
                : next({ statusCode: 404 }))
            .catch(next)
    )

    // TODO: find out why this isn't saving links?
    .post('/users/:username', (req: Request, res: Response, next: NextFunction) =>
        userRepository.findOne({
            where: { username: req.params.username },
            include: [linkRepository]
        })
            .then(user => {
                user.update(req.body)
                    .then(async user => {
                        user = await user.save()
                        user
                            ? res.json(user)
                            : next({ statusCode: 404 })
                    })
                    .catch(next)
            })
            .catch(next)
    )

    .post('/users', (req: Request, res: Response, next: NextFunction) =>
        userRepository.create(req.body)
            .then(user => res.json(user))
            .catch(next)
    )

    // Get all links for a user
    .get('/users/:username/links', (req: Request, res: Response, next: NextFunction) =>
        userRepository.findOne({
            where: { username: req.params.username },
            include: [linkRepository],
            attributes: ['firstName', 'lastName', 'username', 'email', 'id'],
        })
            .then(user => {
                if(user) {
                    const links = user.links.sort((a, b) => {
                        return (a.position > b.position) ? 1 : -1
                    });
                    return res.json(links)
                } else {
                    return next({ statusCode: 404 });
                }
            })
            .catch(next)
    )

;
