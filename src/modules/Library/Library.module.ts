import { Module } from '@nestjs/common';
import { LibraryService } from './Library.service'; // Importa el servicio
import { LibraryController } from './Library.controller';// Importa el controlador

@Module({ // Define el módulo
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}