import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Exemplo de API hospedado no Railway, utilizando Nestjs + Prisma com banco de dados postgres publicado no SupaBase e sistema de autenticação com token JWT. ';
  }
}
