import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Backend NestJS démarré sur http://localhost:${port}`);
  console.log(`📊 API prête pour l'évaluation ISO 59000`);
}

bootstrap();