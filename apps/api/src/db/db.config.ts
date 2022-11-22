import { registerAs } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

export default registerAs('database', () => {
  return {
    type: 'postgres',
    logging: true,
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT as string),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../db/migrations/*.{js,ts}`],
    cli: {
      migrationDir: `${__dirname}/../db/migrations`,
    },
    synchronize: false,
  } as DataSourceOptions
})
