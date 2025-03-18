import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller("libro") 
export class LibroController {
  constructor(private readonly autorService: LibroService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAutorDto: CreateLibroDto) {    return this.autorService.create(createAutorDto);  }
  @Get()
  findAll() {   return this.autorService.findAll();   }
  @Get(':id')
  findOne(@Param('id') id: string) {    return this.autorService.findOne(+id);  }
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Param('id') id: string, @Body() updateAutorDto: UpdateLibroDto) {
    return this.autorService.update(+id, updateAutorDto)
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {  return this.autorService.remove(+id);  }
}