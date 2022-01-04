import { Repository } from '../../common/repository';
import { Board } from './board.model';

/**
 * @remarks This method create repository instance for boards {@link Repository}
 */
export const boardRepository: Repository<Board> = new Repository();
