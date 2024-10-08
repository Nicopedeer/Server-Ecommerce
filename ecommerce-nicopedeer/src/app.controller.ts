import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  async onModuleInit(){
    await this.appService.addCategories()
    await this.appService.preloadData()
  }
}
