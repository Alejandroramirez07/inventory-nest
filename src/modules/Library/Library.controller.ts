import {Controller,Get,Post,Patch,Delete,Param,Body,} from '@nestjs/common';
import { LibraryService } from './Library.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Library')
@Controller('Library')

@Controller('Library') // Ruta base del controlador
export class LibraryController {
  constructor(private readonly LibraryService: LibraryService) {} // Inyecta el servicio

  // Productos por nombre

  @Get('products') // Lista todos los productos
  listProducts() {
    return this.LibraryService.listProducts();
  }

  @Get('products/:name') // Obtiene un producto por nombre
  getProductByName(@Param('name') name: string) {
    return this.LibraryService.findProductByName(name);
  }

  @Post('products') // Crea un producto
  createProduct(@Body() dto: CreateProductDto) {
    return this.LibraryService.createProduct(dto);
  }

  @Patch('products/:name')// Actualiza un producto por nombre
  updateProductByName(
    @Param('name') name: string,
    @Body() dto: Partial<CreateProductDto>,
  ) {
    return this.LibraryService.updateProductByName(name, dto);
  }

  @Delete('products/:name') // Elimina un producto por nombre
  removeProductByName(@Param('name') name: string) {
    return this.LibraryService.removeProductByName(name);
  }

  // 🍽️ Promos por número

  @Get('Promos') // Lista todos los Promos
  listPromos() {
    return this.LibraryService.listPromos();
  }

  @Get('Promos/:number') // Número es un entero
  getPromoByNumber(@Param('number') number: number) { // Nuevo endpoint
    return this.LibraryService.findPromoByNumber(number);
  }

  @Get('Promos/:number/total') // Nuevo endpoint para precio total
  getPromoWithTotal(@Param('number') number: number) {
    return this.LibraryService.getPromoWithTotalPrice(number);
}

  @Post('Promos') // Crea un Promo
  createPromo(@Body() dto: { name: string; items: string[] }) {
    return this.LibraryService.createPromo(dto);
  }

  @Patch('Promos/:number') // Actualiza un Promo
  updatePromoByNumber(
    @Param('number') number: number,
    @Body() dto: Partial<{ name: string; items: string[] }>,
  ) {
    return this.LibraryService.updatePromoByNumber(number, dto);
  }

  @Delete('Promos/:number') // Elimina un Promo
  removePromoByNumber(@Param('number') number: number) {
    return this.LibraryService.removePromoByNumber(number);
  }
}

