import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(//Conexión con la base de datos
    @InjectRepository(Usuario,'base2')
    private usuarioRepository:Repository<Usuario>
  ){}
  async create(createUsuarioDto: CreateUsuarioDto):Promise<Usuario> {
    const usuario=this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async findAll():Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number):Promise<Usuario> {
    const usuario=await this.usuarioRepository.findOne({where:{id}});
    return usuario;
  }

  async update(id: number, updateUsuarioDto: CreateUsuarioDto) {
    const usuario=await this.findOne(id);
    this.usuarioRepository.merge(usuario,updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number):Promise<void> {
    const usuario=await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  async findByEmail(email:string):Promise<Usuario|void>{
    return await this.usuarioRepository.findOne({where:{email}});
  }
  async activateUser(id:number):Promise<Usuario>{
    const usuario=await this.usuarioRepository.findOne({where:{id}});
    usuario.activo=true;
    return await this.usuarioRepository.save(usuario);
  }
  async deactivateUser(id:number):Promise<Usuario>{
    const usuario=await this.usuarioRepository.findOne({where:{id}});
    usuario.activo=false;
    return await this.usuarioRepository.save(usuario);
  }
}
