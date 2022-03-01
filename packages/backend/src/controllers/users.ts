import { Router, Request, Response } from 'express';
import { db } from '../db';
import { AppUser } from '@common/models';
import { UserRequestPayload } from '@common/requests';

const USER_PATH = '/users';

const router: Router = Router();

// create table Users:
router.get('/create', () => db.users.create());

router.get<UserRequestPayload[]>('/', () => db.users.all());

// add a new user, if it doesn't exist yet, and return the object:
router.get<UserRequestPayload>('/add/:name', (req: Request) => {
    return db.task('add-user', async t => {
        const user: AppUser = await t.users.findByName(req.params.name);
        return user || await t.users.add(req.params.name);
    });
});

export default router;
export {
    USER_PATH
}
