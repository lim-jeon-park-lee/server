import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   ['/docs', '/docs-json'],
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       yourUserName: 'p4ssw0rd',
  //     },
  //   }),
  // );

  const config = new DocumentBuilder()
    .setTitle('팔씨름고?')
    .setDescription('팔씨름... 고...?')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
