import { sequelize } from './sequelize';
import { AppUserModel } from './models/user.model';
import { LinkModel } from './models/link.model';

const userRepository = sequelize.getRepository(AppUserModel);
const linkRepository = sequelize.getRepository(LinkModel);

export {
    userRepository,
    linkRepository
}
