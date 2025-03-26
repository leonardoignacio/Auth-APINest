import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) :Promise<UserEntity> {
    const hash = await bcrypt.hash(createUserDto.senha, 12);
    createUserDto.senha = hash;
    return this.prisma.user.create({data:createUserDto});
}

  /* async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  } */
 async findUnique(email :string) :Promise<UserEntity>{
    return this.prisma.user.findUnique({where:{email}});
 }

  async findOne(id: number) :Promise<Omit<UserEntity, 'senha'>> {
    const user= await this.prisma.user.findUnique({where: {id}});
    const { senha, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({where: {id}, data: updateUserDto});
  }

  async remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({where:{id}});
  }
}