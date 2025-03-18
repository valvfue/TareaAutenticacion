import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './_biblioteca/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde el frontend
  app.enableCors({
    origin: ['http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Permitir envío de credenciales como JWT en las peticiones
  });

  // Obtener instancia de AuthService y ejecutar testBcrypt()
  const authService = app.get(AuthService);
  await authService.testBcrypt(); // Ejecuta la prueba automáticamente al iniciar NestJS

  await app.listen(process.env.PUERTO || 3001);
}
bootstrap();



