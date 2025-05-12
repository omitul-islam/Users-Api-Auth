import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("APP")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Test route', description: 'Simple Api test route' })
  getHello(): string {
    return this.appService.getHello();
  }
}
