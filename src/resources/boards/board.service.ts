import { BaseService } from '../../common/base-service';
import { taskService } from '../tasks/task.service';
import { Board } from './board.model';

/**
 * @remarks extend {@link BaseService} and add specific method for Boards
 * @typeParam Board - model of the {@link Board}
 */
class BoardService extends BaseService<Board> {
  /**
   * Async func remove board and connected tasks.
   *
   * @param boardId - The id of board for deletion
   */
  async removeByIdWithConnectedTasks(boardId: string) {
    const allTasks = await taskService.getAll();
    const connectedTasks = allTasks.filter((task) => task.boardId === boardId);
    connectedTasks.forEach(async (task) => taskService.removeById(task.id));
    await this.removeById(boardId);
  }
}

export const boardService = new BoardService(Board);
