import { BaseService } from '../../common/base-service';
import { Task } from './task.model';

export const taskService = new BaseService<Task>(Task);
