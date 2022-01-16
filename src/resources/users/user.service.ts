import { BaseService } from '../../common/base-service';
import { taskService } from '../tasks/task.service';
import { User } from './user.model';

/**
 * @remarks extend {@link BaseService} and add specific method for Users
 * @typeParam User - model of the {@link User}
 */
class UserService extends BaseService<User> {
  /**
   * Async func delete user and cancel the assignment of all his tasks
   *
   * @param userId - The id of user for deletion
   */
  async removeByIdAndUnassignConnectedTasks(userId: string) {
    const allTasks = await taskService.getAll();
    const connectedTasks = allTasks.filter((task) => task.userId === userId);
    connectedTasks.forEach(async (task) => {
      await taskService.updateItem({ ...task, userId: null });
    });
    await this.removeById(userId);
  }
}

export const userService = new UserService(User);
