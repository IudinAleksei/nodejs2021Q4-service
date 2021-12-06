import { BaseService } from '../../common/base-service';
import { taskService } from '../tasks/task.service';
import { boardRepository } from './board.memory.repository';
import { Board } from './board.model';

class BoardService extends BaseService<Board> {
  async removeByIdWithConnectedTasks(boardId: string) {
    const allTasks = await taskService.getAll();
    const connectedTasks = allTasks.filter((task) => task.boardId === boardId);
    connectedTasks.forEach((task) => taskService.removeById(task.id));
    this.removeById(boardId);
  }
}

export const boardService = new BoardService(boardRepository);
