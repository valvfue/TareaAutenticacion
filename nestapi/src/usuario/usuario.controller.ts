import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto):Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll():Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Usuario> {
    return this.usuarioService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() usuarioDto: CreateUsuarioDto):Promise<Usuario> {
    return this.usuarioService.update(+id, usuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<void> {
    await this.usuarioService.remove(+id);
  }
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return usuario;
  }

  @Put(':id/activate')
  async activateUser(@Param('id') id: number): Promise<Usuario> {
      return await this.usuarioService.activateUser(id);
  }

  @Put(':id/deactivate')
  async deactivateUser(@Param('id') id: string): Promise<Usuario> {
      return await this.usuarioService.deactivateUser(+id);
}
}
