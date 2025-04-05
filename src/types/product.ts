// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   material: string;
//   rating: number;
//   available: boolean;
// }


export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string | null;
  vendor: {
    id: string;
    name: string;
    rating: number | null;
  };
  category: string;
  brand: string;
  attributes: Array<{
    name: string;
    value: string;
  }>;
}
