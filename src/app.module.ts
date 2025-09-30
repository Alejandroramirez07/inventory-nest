import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ChestModule } from './modules/Projects/project.module';
import { projectsController } from './modules/Projects/projects.controller';
import { ProjectService } from './modules/Projects/project.service';
import { PanaderiaModule } from './modules/Panaderia/panaderia.module';
import { PanaderiaController } from './modules/Panaderia/panaderia.controller';
import { PanaderiaService } from './modules/Panaderia/panaderia.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, ChestModule, PanaderiaModule],
  controllers: [AppController, projectsController, PanaderiaController],
  providers: [AppService, ProjectService, PanaderiaService]
})
export class AppModule {}
