import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsString() @IsNotEmpty()
        nombre: string;
        @IsString() @IsNotEmpty()
        email: string;
        @IsString() @IsNotEmpty() @MinLength(6)
        password: string;
        activo?:boolean;
    }
