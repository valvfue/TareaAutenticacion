import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('autor') 
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  // Ruta protegida para crear un autor
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  // Ruta pública para obtener todos los autores
  @Get()
  findAll() {
    return this.autorService.findAll();
  }

  // Ruta pública para obtener un autor por su id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autorService.findOne(+id);
  }

  // Ruta protegida para actualizar un autor
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAutorDto: UpdateAutorDto) {
    return this.autorService.update(+id, updateAutorDto);
  }

  // Ruta protegida para eliminar un autor
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autorService.remove(+id);
  }
}
