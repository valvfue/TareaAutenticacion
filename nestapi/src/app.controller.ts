import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('productos')
  getHello():string {
    return this.appService.getHello();
  }
  @Get('carrito')
  getCarrito():string {
    return this.appService.getHello(); 
  }

}

