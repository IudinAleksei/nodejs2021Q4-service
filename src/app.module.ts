import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ColumnModule } from './column/column.module';
import { BoardModule } from './board/board.module';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Board } from './board/entities/board.entity';

export const TYPEORM_CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.PGPORT || '3001', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Task, Board],
  migrations: [],
  migrationsRun: false,
  synchronize: true,
  logging: false,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TYPEORM_CONNECTION_OPTIONS),
    UserModule,
    TaskModule,
    ColumnModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
