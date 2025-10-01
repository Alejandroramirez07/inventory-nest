import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProjectModule } from './modules/Projects/project.module';
import { projectsController } from './modules/Projects/projects.controller';
import { ProjectService } from './modules/Projects/project.service';
import { LibraryModule } from './modules/Library/Library.module';
import { LibraryController } from './modules/Library/Library.controller';
import { LibraryService } from './modules/Library/Library.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, ProjectModule, LibraryModule],
  controllers: [AppController, projectsController, LibraryController],
  providers: [AppService, ProjectService, LibraryService]
})
export class AppModule {}
