import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [forwardRef(()=>AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
