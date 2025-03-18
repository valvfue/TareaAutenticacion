import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { LocalStrategy } from './local-strategy/local-strategy';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { UsuarioModule } from "../users/users.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
      ConfigModule.forRoot(), // Se asegura de cargar las variables de entorno
      UsuarioModule,
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'secreto_de_prueba', // Ahora usa variable de entorno
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
      }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule], // Exporta JwtModule para su uso en otros módulos
})
export class AuthModule {}
