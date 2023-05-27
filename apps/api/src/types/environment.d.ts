declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      NODE_ENV: 'development' | 'production'
      TOKEN_EXPIRE: string
      POSTGRES_HOST: string
      UI_HOST: string
      UI_PORT: string
      API_HOST: string
      API_PORT: string
      DB_URI: string
      JWT_SECRET: string
      SALT_ROUNDS: string
      TOKEN_EXPIRE: string
    }
  }
}

export {}
