import { Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor,'base1')
    private libroRepository: Repository<Autor>,
  ) {}

  async create(createLibroDto: CreateAutorDto): Promise<Autor> {
    const libro = this.libroRepository.create(createLibroDto)
    return this.libroRepository.save(libro)
  }

  async findAll(): Promise<Autor[]> {
    return this.libroRepository.find()
  }
  async findOne(id: number): Promise<Autor> {
    return this.libroRepository.findOne({ where: { id }})
  }

  async update(id: number, updateLibroDto: UpdateAutorDto): Promise<Autor> {
    await this.libroRepository.update(id, updateLibroDto)
    return this.libroRepository.findOne({ where: { id } })
  }

  async remove(id: number): Promise<void> {
    await this.libroRepository.delete(id)
  }
}