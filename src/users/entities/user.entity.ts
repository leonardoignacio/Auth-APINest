import { User } from '@prisma/client';
export class UserEntity implements User {
    id: number;
    nome: string;
    email: string;
    senha: string;
    createAt: Date;
    updateAt: Date;
}
