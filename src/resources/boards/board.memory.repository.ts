import typeorm, { Repository } from 'typeorm';
import { Board } from './board.model';

const { getRepository } = typeorm;

/**
 * @remarks This method create repository instance for boards {@link Repository}
 */
export const boardRepository: Repository<Board> = getRepository(Board);
