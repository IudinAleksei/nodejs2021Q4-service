import { Task } from './task.model';
import { Repository } from '../../common/repository';

export const taskRepository: Repository<Task> = new Repository();
