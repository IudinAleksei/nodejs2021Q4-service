import { Repository } from '../../common/repository';
import { User } from './user.model';

/**
 * @remarks This method create repository instance for users {@link Repository}
 */
export const userRepository: Repository<User> = new Repository();
