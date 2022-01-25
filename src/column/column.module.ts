import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from './column.service';
import { BoardColumn } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn])],
  providers: [ColumnService],
})
export class ColumnModule {}
