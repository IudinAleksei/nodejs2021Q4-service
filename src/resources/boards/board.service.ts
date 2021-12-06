import { BaseService } from '../../common/base-service';
import { taskService } from '../tasks/task.service';
import { boardRepository } from './board.memory.repository';

class BoardService extends BaseService {
  async removeByIdWithConnectedTasks(boardId) {
    const allTasks = await taskService.getAll();
    const connectedTasks = allTasks.filter((task) => task.boardId === boardId);
    connectedTasks.forEach((task) => taskService.removeById(task.id));
    this.removeById(boardId);
  }
}

export const boardService = new BoardService(boardRepository);
