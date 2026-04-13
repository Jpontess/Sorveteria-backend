import bcrypt from "bcryptjs";
import type { UserDTO } from "../../models/Users/user.dto.ts";
import { UserRepository } from "../../repository/login/user.repository.ts";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";


config();
const CHAVE = process.env.JWT_SECRET;

export class AuthService {
    constructor(private readonly repository: UserRepository){}

    registerUsers = async (user: UserDTO) => {
        const findUser = await this.repository.findByUser(user.name);
        if (findUser) throw new Error(`Usuário com nome ${user.name} já cadastrado.`);

        const hashPassword = await bcrypt.hash(user.password, 10);

        return await this.repository.create({
            ...user,
            password: hashPassword
        });
    };

    singIn = async (name: string, password: string) => {
        const findUser = await this.repository.findByUser(name);
        if(!findUser) throw new Error("Usuário não encontrado");

        const isMatchHash = await bcrypt.compare(password, findUser.password!);
        if (!isMatchHash) throw new Error("Senha está incorreta!");
        
        const token = jwt.sign({name}, CHAVE!, {expiresIn: "5h"});
        return token;
    };
};
