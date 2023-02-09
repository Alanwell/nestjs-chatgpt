import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('chat')
  getChat(@Query('message') message): unknown {
    return this.appService.getChatService(message);
  }
}
