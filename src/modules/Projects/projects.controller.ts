import {Controller,Get,Post,Patch,Delete,Param,Body,ParseIntPipe
} from '@nestjs/common'; // Import necessary decorators and pipes from NestJS
import { ProjectService } from './project.service'; // Import the projectsService to handle business logic
import { CreateItemDto } from './dto/create-item.dto'; // Import DTO for creating items
import { UpdateItemDto } from './dto/update-item.dto'; // Import DTO for updating items
import { IItem } from './item.model'; // Import the IItem interface
import type { ICharacter } from './item.model'; // Import the ICharacter type
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class projectsController {
  constructor(private readonly projectsService: ProjectService) {}

  @Get(':character') // Define a GET endpoint that takes a character parameter
  findAll(@Param('character') character: ICharacter) {
    return this.projectsService.findAll(character);
  }

  @Post() // Define a POST endpoint to create a new item
  create(@Body() createItemDto: CreateItemDto) {
    return this.projectsService.create(createItemDto);
  }

  @Post('combine-Projects')
  combine() {
    return this.projectsService.combineProjects();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { // Use ParseIntPipe to ensure id is a number
    return this.projectsService.remove(id);
  }
}
