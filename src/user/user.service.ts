import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({relations: {role: {policies: {resource: true}}, }});
    // return this.usersRepository.find({relations: {role: true, }});
  }

  findOne(id: number): Promise <User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const users = await this.usersRepository.find({
      relations: {role: true,}
    });
    return users.find(user => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // async findPermission(role: number): Promise<Boolean> {

  // }
}
