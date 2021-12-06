import { Repository } from '../../common/repository';
import { User } from './user.model';

export const userRepository: Repository<User> = new Repository();
