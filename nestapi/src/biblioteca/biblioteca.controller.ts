import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { Biblioteca } from './entities/biblioteca.entity';
import { JwtAuthGuard } from '../_biblioteca/auth/jwt/jwt.guard';

@Controller('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Ahora requiere autenticación
  async create(@Body() createBibliotecaDto: CreateBibliotecaDto): Promise<Biblioteca> {
    return this.bibliotecaService.create(createBibliotecaDto);
  }

  @Get()
  async findAll(): Promise<Biblioteca[]> {
    return this.bibliotecaService.findAll();
  }
}

