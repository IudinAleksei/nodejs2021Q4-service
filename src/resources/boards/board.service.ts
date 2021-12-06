import { BaseService } from '../../common/base-service';
import { taskService } from '../tasks/task.service';
import { boardRepository } from './board.memory.repository';

export const boardService = new BaseService(boardRepository);

// @ts-ignore
boardService.removeByIdWithConnectedTasks = async (boardId) => {
  const allTasks = await taskService.getAll();
  const connectedTasks = allTasks.filter((task) => task.boardId === boardId);
  connectedTasks.forEach((task) => taskService.removeById(task.id));
  boardService.removeById(boardId);
};
