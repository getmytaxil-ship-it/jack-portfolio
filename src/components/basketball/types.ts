export interface Product {
  id: number;
  namePart1: string;
  namePart2: string;
  price: number;
  primaryColor: string;
  lineColor: string;
  accentColor: string;
  texturePattern: 'classic' | 'cross' | 'street' | 'tech';
}
