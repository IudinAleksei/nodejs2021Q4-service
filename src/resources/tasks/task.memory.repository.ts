import { Task } from './task.model';
import { Repository } from '../../common/repository';

/**
 * @remarks This method create repository instance for tasks {@link Repository}
 */
export const taskRepository: Repository<Task> = new Repository();
