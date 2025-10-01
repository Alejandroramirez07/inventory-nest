import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator'; // Importa validadores
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto { // DTO para crear productos
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre del producto' }) // Agrega la propiedad de Swagger
  name: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Precio del producto' }) // Agrega la propiedad de Swagger
  price: number;
}