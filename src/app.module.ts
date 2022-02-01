import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ColumnModule } from './column/column.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TaskModule,
    ColumnModule,
    BoardModule,
    AuthModule,
    FileModule,
  ],
  providers: [Logger],
})
export class AppModule {}
