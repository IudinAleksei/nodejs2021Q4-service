import { BaseService } from '../../common/base-service';
import { User } from './user.model';

export const userService = new BaseService<User>(User);
