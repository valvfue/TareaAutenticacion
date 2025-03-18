import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log("📌 Buscando usuario con email:", email.trim().toLowerCase());

    const user = await this.userService.findOne(email.trim().toLowerCase());

    if (!user) {
      console.error("❌ Usuario no encontrado en la base de datos.");
      throw new UnauthorizedException("Usuario no encontrado");
    }

    console.log("✅ Usuario encontrado en BD:", user);

    if (!pass || !user.password) {
      console.error("❌ Error: La contraseña ingresada o almacenada en BD es inválida.");
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    console.log("🔑 Comparando contraseña ingresada:", pass);
    console.log("🔒 Hash en BD:", user.password);

    const isMatch = await bcrypt.compare(pass, user.password);
    console.log("🔍 ¿Contraseña coincide?:", isMatch);

    if (!isMatch) {
      console.error("❌ Contraseña incorrecta.");
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    console.log("✅ Contraseña correcta, autenticando usuario...");
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado");
    }
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    if (!password || password.trim() === "") {
      console.error("❌ Error: La contraseña no puede estar vacía.");
      throw new Error("La contraseña es obligatoria.");
    }
    
    console.log("🔑 Contraseña antes de hashear:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 Hash generado correctamente:", hashedPassword);
    
    const user = await this.userService.create(name, email.trim().toLowerCase(), hashedPassword);
    return this.login(user);
  }

  // 🔍 Prueba manual de bcrypt.hash() y bcrypt.compare()
  async testBcrypt() {
    const testPassword = "123456";
    const storedHash = "$2b$10$D4dIuWdMlrsZqMketcfLsO0LSnTJCU6qGw.iVxhJA1uEXyXO4.i3G"; // Hash actual en BD

    // Generar un nuevo hash para actualizar en la BD
    const newHash = await bcrypt.hash(testPassword, 10);
    console.log("🔒 Nuevo hash generado para la BD:", newHash);

    // Comparar la contraseña con el nuevo hash (debe ser true)
    const isMatchNew = await bcrypt.compare(testPassword, newHash);
    console.log("⚡ Comparación con nuevo hash (debería ser true):", isMatchNew);

    // Comparar la contraseña con el hash actual de la BD
    const isMatchStored = await bcrypt.compare(testPassword, storedHash);
    console.log("⚡ Comparación con hash en BD (debería ser true si el hash es válido):", isMatchStored);
  }
}




