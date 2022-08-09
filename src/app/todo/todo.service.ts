import { TodoEntity } from './todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
        ) {}

        async findAll() {
            return await this.todoRepository.find();
        }

        async findOneOrFail(id: string | FindOneOptions<TodoEntity>) {
            try {
                return await this.findOneOrFail(id);
            } catch (error) {
                throw new NotFoundException(error.message);
            }
        }

        async create(data: DeepPartial<TodoEntity>[]) {
            return await this.todoRepository.save(this.todoRepository.create(data));
        }

        async update(id: string, data: DeepPartial<TodoEntity>) {
            const todo = await this.findOneOrFail(id);

            this.todoRepository.merge(todo, data);
            return await this.todoRepository.save(todo);
        }

        async deleteById(id: string) {
            await this.findOneOrFail(id);

            await this.todoRepository.softDelete(id);
        }
}