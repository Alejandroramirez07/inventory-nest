import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator'; // Importa los decoradores necesarios desde class-validator
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateItemDto { // Define la clase CreateItemDto
  @IsNotEmpty() // El decorador IsNotEmpty asegura que el campo no esté vacío
  @IsString() // El decorador IsString asegura que el campo sea una cadena de texto
  @ApiProperty({ description: 'Nombre del proyecto' }) // Agrega la propiedad de Swagger
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Tipo de proyecto' }) // Agrega la propiedad de Swagger
  type: string;

  @IsInt() // El decorador IsInt asegura que el campo sea un número entero  
  @Min(1) // El decorador Min asegura que el valor mínimo sea 1
  @ApiProperty({ description: 'Cantidad de proyectos' }) // Agrega la propiedad de Swagger
  quantity: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Persona a quien se restringe la información' }) // Agrega la propiedad de Swagger
  restrictedTo?: 'Desarrollador' | 'Project Manager'; // Propiedad opcional para restringir el ítem a un personaje específico
}