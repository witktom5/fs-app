declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      JWT_EXPIRE_TIME: string
      NODE_ENV: 'development' | 'production' | 'test'
      UI_HOST: string
      UI_PORT: string
      API_HOST: string
      API_PORT: string
      DB_URI: string
      SALT_ROUNDS: string
    }
  }
}

export {}
