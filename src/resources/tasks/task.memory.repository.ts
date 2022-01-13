import typeorm, { Repository } from 'typeorm';
import { Task } from './task.model';

const { getRepository } = typeorm;

/**
 * @remarks This method create repository instance for tasks {@link Repository}
 */
export const taskRepository: Repository<Task> = getRepository(Task);
