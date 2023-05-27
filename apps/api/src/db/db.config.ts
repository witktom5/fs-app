import { registerAs } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

export default registerAs('dbconfig', () => {
  return {
    type: 'postgres',
    logging: true,
    url: process.env.DB_URI,
    autoLoadEntities: true,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../db/migrations/*.{js,ts}`],
    cli: {
      migrationDir: `${__dirname}/../db/migrations`,
    },
    synchronize: false,
  } as DataSourceOptions
})
