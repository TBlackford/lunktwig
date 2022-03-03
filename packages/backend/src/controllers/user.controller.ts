import { NextFunction, Request, Response, Router } from 'express';
import { Repository } from 'sequelize-typescript';

import { AppUserModel } from '../db/';
import { linkRepository } from '../db/repositories';

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
                attributes: ['firstName', 'lastName', 'username', 'email']
            })
                .then(user => user
                    ? res.json(user)
                    : next({ statusCode: 404 }))
                .catch(next)
        )

        .post('/users', (req: Request, res: Response, next: NextFunction) =>
            userRepository.create(req.body)
                .then(user => res.json(user))
                .catch(next)
        )

;
