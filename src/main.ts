import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
                      .setTitle('Car-dealership')
                      .setDescription('The car dealership API descriptions')
                      .setVersion('0.0.1')
                      .addTag('cars')
                      .addTag('owners')
                      .addTag('manufacturers')
                      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
