import {IsOptional, IsString, IsStrongPassword, MaxLength, Min } from 'class-validator';

export class UserDTO {
    @IsOptional()
    _id?: string

    @IsString()
    @Min(4, {message: "O mínimo de caracter que seu nome deve ter é 4"})
    name!: string;

    @IsString()
    @Min(4, {message: "O mínimo de caracter que sua senha deve ter é 4"})
    @MaxLength(10, {message: "O máximo de caracter que sua senha deve ter é 10"})
    password!: string;
}