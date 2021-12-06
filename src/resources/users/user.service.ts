import { BaseService } from '../../common/base-service';
import { taskService } from '../tasks/task.service';
import { userRepository } from './user.memory.repository';

class UserService extends BaseService {
  async removeByIdAndUnassignConnectedTasks(userId) {
    const allTasks = await taskService.getAll();
    const connectedTasks = allTasks.filter((task) => task.userId === userId);
    connectedTasks.forEach(async (task) => {
      await taskService.removeById(task.id);
      taskService.addItem({ ...task, userId: null });
    });
    this.removeById(userId);
  }
}

export const userService = new UserService(userRepository);
