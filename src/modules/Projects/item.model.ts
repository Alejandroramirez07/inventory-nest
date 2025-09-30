export type ICharacter = 'Desarrollador' | 'Project Manager'; // Define the character types
export interface IItem { // Define the IItem interface
  id: number; // Unique identifier for the item
  name: string;
  type: 'web' | 'Security' | 'cloud';
  quantity: number;
  restrictedTo?: ICharacter; // Optional property to restrict the item to a specific character
}