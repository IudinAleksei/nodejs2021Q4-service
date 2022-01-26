import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Put,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'boards/:boardId/tasks' })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto) {
  //   return this.taskService.create(createTaskDto);
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get()
  // findAll() {
  //   return this.taskService.findAll();
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get(':id')
  // findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.taskService.findOne(id);
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Put(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ) {
  //   return this.taskService.update(id, updateTaskDto);
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.taskService.remove(id);
  // }
}
