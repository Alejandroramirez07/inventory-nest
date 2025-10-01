import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsInt } from 'class-validator'; // Importa validadores
import { ApiProperty } from '@nestjs/swagger';

export class createPromo { // DTO para crear combos
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre de la promo' }) // Agrega la propiedad de Swagger 
  name: string;

  @IsArray()// Asegura que es un array
  @ArrayNotEmpty()
  @IsInt({ each: true })// Asegura que cada elemento es un entero
  @ApiProperty({ description: 'IDs de libros' }) // Agrega la propiedad de Swagger
  items: number[]; // IDs de productos
}
