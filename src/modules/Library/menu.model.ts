export interface IProduct { // Producto individual
  id: number;
  name: string;
  price: number;
}

export interface IPromo { // Promo de productos
  id: number;
  name: string;
  items: IProduct[];
}