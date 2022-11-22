export interface JwtPayload {
  username: string
  sub: number
}

export interface JwtSign {
  access_token: string
}
