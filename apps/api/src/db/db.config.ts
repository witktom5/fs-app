import { registerAs } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

export default registerAs('database', () => {
  if (typeof process.env.POSTGRES_PORT !== 'string')
    throw new Error('env error') // TODO improve
  return {
    type: 'postgres',
    logging: true,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    cli: {
      migrationDir: `${__dirname}/../migrations`,
    },
    synchronize: false,
  } as DataSourceOptions
})
