import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { AppDataSource } from './db/db.datasource'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableShutdownHooks()

  app.use(helmet.crossOriginResourcePolicy())
  app.use(helmet.frameguard({ action: 'deny' }))

  AppDataSource.initialize()

  const configService = app.get<ConfigService>(ConfigService)
  await app.listen(+configService.get('API_PORT'))
}
bootstrap()
