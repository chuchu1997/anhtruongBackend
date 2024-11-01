export interface productImages {
  id: string;
  path: string;
}
export class CreateProductDto {
  id?: string;
  title: string;
  description: string;
  category: string;
  imagesObject?: productImages[];
  price: string;
  hashtag?: Array<string>;
  amount: number;
  dropshipFrom?: string;
  bestSelling?: boolean;
}
