import { BaseService } from '../../common/base-service';
import { taskRepository } from './task.memory.repository';

export const taskService = new BaseService(taskRepository);
