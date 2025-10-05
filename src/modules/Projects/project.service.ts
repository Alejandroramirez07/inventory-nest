import { Injectable, NotFoundException } from '@nestjs/common';
import { IItem, ICharacter } from './item.model';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ProjectService {
  private maxSlots = 10; // Máximo de proyectos permitidos

  private projects: IItem[] = [ // Sample items in the projects
    { id: 1, name: 'E commerce', type: 'web', quantity: 2, restrictedTo: 'Desarrollador' },
    { id: 2, name: 'MFA', type: 'Security', quantity: 3 },
    { id: 3, name: 'Expansion', type: 'cloud', quantity: 2 },
    { id: 4, name: 'Delivery', type: 'web', quantity: 1, restrictedTo: 'Project Manager' }
  ];

  findAll(character: ICharacter): IItem[] { // Filter items based on character restrictions
    return this.projects.filter(item => !item.restrictedTo || item.restrictedTo === character); // Return items that are either unrestricted or restricted to the specified character
  }

  findOne(id: number): IItem { // Find an item by its ID
    const item = this.projects.find(i => i.id === id); // Search for the item in the project
    if (!item) throw new NotFoundException(`Item con id ${id} no encontrado`); // Throw an error if the item is not found
    return item;
  }

  create(createItemDto: CreateItemDto): IItem { // Create a new item in the projects
    if (this.projects.length >= this.maxSlots) {
      throw new Error('No hay espacio para más proyectos');
    }

    const newId = this.projects.length > 0
      ? this.projects[this.projects.length - 1].id + 1
      : 1;

    const newItem: IItem = {
      id: newId,
      name: createItemDto.name,
      type: createItemDto.type as IItem['type'],
      quantity: createItemDto.quantity,
      restrictedTo: createItemDto.restrictedTo
    };

    this.projects.push(newItem);
    return newItem;
  }

  update(id: number, updateItemDto: UpdateItemDto): IItem {
    const item = this.findOne(id);
    Object.assign(item, updateItemDto);
    return item;
  }

  remove(id: number): { deleted: boolean } {
    const item = this.findOne(id);
    this.projects.splice(this.projects.indexOf(item), 1);
    return { deleted: true };
  }

  combineProjects(): IItem { // Combine web and security Projects to create a portfolio
    const web = this.projects.find(i => i.name === 'Security' && i.quantity > 0); // Find web portfolio with quantity > 0
    const security = this.projects.find(i => i.name === 'Cloud' && i.quantity > 0); // Find security portfolio with quantity > 0

    if (web && security) { // If both Projects are available
      web.quantity--; // Decrease quantity of web portfolio
      security.quantity--;// Decrease quantity of security portfolio

      if (web.quantity === 0) {
        this.projects.splice(this.projects.indexOf(web), 1); // Remove web portfolio if quantity is 0
      }
      if (security.quantity === 0) {
        this.projects.splice(this.projects.indexOf(security), 1); // Remove security portfolio if quantity is 0
      }

      if (this.projects.length >= this.maxSlots) {
        throw new Error('No es posible generar más proyectos');
      }

      const mixed: IItem = { 
        id: this.projects.length > 0 ? this.projects[this.projects.length - 1].id + 1 : 1,
        name: 'Deploymeny',
        type: 'cloud',
        quantity: 1
      };

      this.projects.push(mixed);
      return mixed;
    }

    throw new Error('Not possible to deploy');
  }
}