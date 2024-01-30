import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  //create(createUserDto: CreateUserDto): Promise<User> {
    //const user = this.usersRepository.create(createUserDto);
   // return this.usersRepository.save(user);
 // }


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, user.salt);
    }
    await this.usersRepository.update(id, updateUserDto);
    return 'User updated'
  }

  async updateAnyUser(id: number, updateUserDto: UpdateUserDto){
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, user.salt);
    }
    await this.usersRepository.update(id, updateUserDto);
    return `User id ${id} updated`;
  }

  async remove(id: number): Promise<string> {
    await this.usersRepository.delete(id);
    return `Le user d' id ${id} is deleted`;
  }
}
