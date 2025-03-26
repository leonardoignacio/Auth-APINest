import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserEntity } from '@/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private readonly jwtService :JwtService) {}

  async signin(body: Prisma.UserCreateInput) :Promise<Omit<UserEntity, 'senha'>& Partial <{token :string}> | any>{
        const user = await this.usersService.findUnique(body.email);
        
        if (!user) throw new NotFoundException('Usuario não encontrado.');
        const autenticado = await bcrypt.compare(body.senha, user.senha);
        if (!autenticado) throw new UnauthorizedException('Credencial inválida.');
        
        //Geração de token com JWT
        const token = await this.jwtService.signAsync({sub:user.id});
        

        const { senha, ...result } = user;
        return {result, token};
    }

}