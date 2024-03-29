import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return {
      data: {
        title: 'chattings',
        copyright: 'Lee hyeon Jong',
      },
    };
  }
}
