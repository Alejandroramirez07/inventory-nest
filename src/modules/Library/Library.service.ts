import {Injectable,NotFoundException,OnModuleInit,} from '@nestjs/common';
import { IProduct, IPromo } from './menu.model'; // Importa las interfaces
import { CreateProductDto } from './dto/create-product.dto'; // DTO para crear productos
import { createPromo } from './dto/create-promo.dto'; // DTO para crear Promos

@Injectable()
export class LibraryService implements OnModuleInit {// Implementa OnModuleInit para precarga
  private products: IProduct[] = []; // Almacena productos
  private Promos: IPromo[] = []; // Almacena Promos

  // Precarga inicial
  onModuleInit() {//
    this.createProduct({ name: 'Harry Potter', price: 30000 }); 
    this.createProduct({ name: 'Señor de los anillos', price: 40000 });
    this.createProduct({ name: 'James Bond', price: 20000 });
    this.createProduct({ name: 'Victoria sin guerra', price: 25000 });
    this.createProduct({ name: 'Reflexiones de Marco Aurelio', price: 25000 });
    this.createProduct({ name: '¿Dónde está la franja amarila?', price: 15000 });
    this.createProduct({ name: 'Cartas desde Iwo Jima', price: 35000 });
    this.createProduct({ name: 'Nietzche Super hombre', price: 60000 });
0
    this.createPromo({ name: 'Promo 1', items: ['Harry Potter', 'Señor de los anillos', 'James Bond'] });
    this.createPromo({ name: 'Promo 2', items: ['Victoria sin guerra', 'Señor de los anillos', '¿Dónde está la franja amarila?'] });
    this.createPromo({ name: 'Promo 3', items: ['Harry Potter', 'Reflexiones de Marco Aurelio', 'Victoria sin guerra', 'Cartas desde Iwo Jima'] });
    this.createPromo({ name: 'Promo 4', items: ['Nietzche Super hombre', 'Reflexiones de Marco Aurelio', '¿Dónde está la franja amarila?'] });
  }

  // Productos por nombre
  createProduct(dto: CreateProductDto): IProduct { 
    const id = this.products.length + 1;// Genera un ID simple
    const { name, price } = dto;
    const product: IProduct = { id, name, price };// Crea el producto
    this.products.push(product);// Lo añade al array
    return product;// Retorna el producto creado
  }

  updateProductByName(name: string, dto: Partial<CreateProductDto>): IProduct {// Partial permite campos opcionales
    const product = this.findProductByName(name);// Busca el producto por nombre
    Object.assign(product, dto);// Actualiza los campos
    return product;
  }

  removeProductByName(name: string): { deleted: boolean } {// Retorna un objeto indicando si fue eliminado
    const product = this.findProductByName(name);// Busca el producto
    this.products.splice(this.products.indexOf(product), 1);// Lo elimina del array
    return { deleted: true };// Retorna confirmación
  }

  findProductByName(name: string): IProduct {// Busca un producto por su nombre 
    const product = this.products.find(p => p.name.toLowerCase() === name.toLowerCase());// Búsqueda 
    if (!product) throw new NotFoundException(`Producto con nombre "${name}" no encontrado`);// Error si no existe
    return product;// Retorna el producto encontrado
  }

  listProducts(): IProduct[] {// Retorna todos los productos
    return this.products;
  }

  // Promos por número
  createPromo(dto: { name: string; items: string[] }): IPromo { // Crea un Promo
    const id = this.Promos.length + 1; // Genera un ID simple
    const items = dto.items.map(name => this.findProductByName(name)); // Mapea nombres a productos
    const Promo: IPromo = { id, name: dto.name, items }; // Crea el Promo
    this.Promos.push(Promo); // Lo añade al array
    return Promo; // Retorna el Promo creado
  }
  getPromoWithTotalPrice(number: number): { Promo: IPromo; total: number } { // Retorna Promo con precio total
  const Promo = this.findPromoByNumber(number);     // Busca el Promo por número
  const total = Promo.items.reduce((sum, item) => sum + item.price, 0);     // Calcula el precio total
  return { Promo, total };
}

  updatePromoByNumber(number: number, dto: Partial<{ name: string; items: string[] }>): IPromo { // Actualiza un Promo
    const Promo = this.findPromoByNumber(number); // Busca el Promo por número
    if (dto.name) Promo.name = dto.name; // Actualiza el nombre si se proporciona
    if (dto.items) Promo.items = dto.items.map(name => this.findProductByName(name)); // Actualiza los items si se proporcionan
    return Promo;
  }

  removePromoByNumber(number: number): { deleted: boolean } {
    const Promo = this.findPromoByNumber(number);
    this.Promos.splice(this.Promos.indexOf(Promo), 1);
    return { deleted: true };
  }

  findPromoByNumber(number: number): IPromo {
    const name = `Promo ${number}`;
    const Promo = this.Promos.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (!Promo) throw new NotFoundException(`Promo número ${number} no encontrado`);
    return Promo;
  }

  listPromos(): IPromo[] {
    return this.Promos;
  }
}