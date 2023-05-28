import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!'
  }
  /* istanbul ignore next */
  getCoverage() {
    if (this.configService.get('ENV') === 'production')
      throw new BadRequestException()
    return {
      // @ts-ignore
      coverage: global.__coverage__ || null,
    }
  }
}
