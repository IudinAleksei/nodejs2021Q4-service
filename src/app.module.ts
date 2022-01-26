import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ColumnModule } from './column/column.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    // TaskModule,
    // ColumnModule,
    // BoardModule,
    // AuthModule,
    // FileModule,
  ],
})
export class AppModule {}
