import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUsuarioDto {
    @IsString() @IsNotEmpty()
    nombre: string;
    @IsString() @IsNotEmpty()
    email: string;
    @IsString() @IsNotEmpty() @MinLength(6)
    password: string;
    activo?:boolean;
}

