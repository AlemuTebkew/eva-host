export interface SubCategory {
  id: string;
  name: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
  image: string;
}
