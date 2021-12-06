import { Repository } from '../../common/repository';
import { Board } from './board.model';

export const boardRepository: Repository<Board> = new Repository();
