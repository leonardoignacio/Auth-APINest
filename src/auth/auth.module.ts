import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [forwardRef(()=>UsersModule), JwtModule.register({
    global:true,
    secret: process.env.SECRET_KEY || '',
    signOptions:{ expiresIn:'60m'},
  })],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard]
})
export class AuthModule {}
