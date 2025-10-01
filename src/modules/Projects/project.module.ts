import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { projectsController } from './projects.controller';

@Module({
  controllers: [projectsController],
  providers: [ProjectService]
})
export class ProjectModule {}
