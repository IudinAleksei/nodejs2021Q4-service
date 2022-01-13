import typeorm, { Repository } from 'typeorm';
import { User } from './user.model';

const { getRepository } = typeorm;

/**
 * @remarks This method create repository instance for users {@link Repository}
 */
export const userRepository: Repository<User> = getRepository(User);
