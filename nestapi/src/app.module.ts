import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { AutorModule } from './_biblioteca/autor/autor.module';
import { LibroModule } from './_biblioteca/libro/libro.module';
import { AuthModule } from './_biblioteca/auth/auth.module';
import { UsuarioModule } from './_biblioteca/users/users.module';

@Module({
  imports: [
    // Cargar el archivo .env
    ConfigModule.forRoot({ 
      isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      name: 'base1',
      type: 'mysql',
      host: process.env.URL || 'localhost',  // Usa la variable de entorno o localhost por defecto
      port: 3306,
      username: process.env.USUARIO || 'root',  // Usa la variable de entorno o 'root' por defecto
      password: process.env.PASSWORD || '',  // Usa la variable de entorno o vacío por defecto
      database: process.env.DBNAME || 'biblioteca_db',  // Usa la variable de entorno o 'biblioteca_db' por defecto
      autoLoadEntities: true,  // Solo carga las entidades de los módulos activos
      synchronize: true,  // Sincroniza la base de datos 
    }),

    BibliotecaModule,
    AutorModule,
    LibroModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

