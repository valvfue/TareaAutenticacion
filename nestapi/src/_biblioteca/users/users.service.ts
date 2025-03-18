import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario, 'base1')
    private userRepository: Repository<Usuario>,
  ) {}

  async findOne(email: string): Promise<Usuario | undefined> {
    console.log("📌 Buscando usuario con email:", email);
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      console.log("✅ Usuario encontrado:", user);
    } else {
      console.log("❌ Usuario no encontrado.");
    }

    return user;
  }

  async create(name: string, email: string, password: string): Promise<Usuario> {
    console.log("🔑 Contraseña antes de encriptar:", password);

    // Asegurar que la contraseña se encripte solo una vez
    if (!password.startsWith("$2b$10$")) {
      password = await bcrypt.hash(password, 10);
      console.log("🔒 Contraseña encriptada:", password);
    } else {
      console.log("⚠️ La contraseña ya estaba encriptada, no se vuelve a encriptar.");
    }

    const user = this.userRepository.create({
      name,
      email: email.trim().toLowerCase(), // Normalizar email
      password,
    });

    console.log("✅ Guardando usuario en la base de datos...");
    return this.userRepository.save(user);
  }
}
