import { Injectable } from '@nestjs/common';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Biblioteca } from './entities/biblioteca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BibliotecaService {
  constructor(
    @InjectRepository(Biblioteca, 'base1') //Aqui le digo a que base de datos quiero acceder
    private bibliotecaRepository: Repository<Biblioteca>
  ) {}

  async create(createBibliotecaDto: CreateBibliotecaDto): Promise<Biblioteca> {
    const libro = this.bibliotecaRepository.create(createBibliotecaDto);
    return this.bibliotecaRepository.save(libro);
  }

  async findAll(): Promise<Biblioteca[]> {
    return this.bibliotecaRepository.find();
  }

  async findOne(id: number): Promise<Biblioteca> {
    return this.bibliotecaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBibliotecaDto: UpdateBibliotecaDto): Promise<Biblioteca> {
    await this.bibliotecaRepository.update(id, updateBibliotecaDto);
    return this.bibliotecaRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<string> {
    const libro = await this.bibliotecaRepository.findOne({ where: { id } });
    if (libro) {
      await this.bibliotecaRepository.remove(libro);
      return "Elemento de la base de datos eliminado";
    }
    return "Elemento no encontrado";
  }

  

}