export class CreateCategoryDto {
  id: string;
  title: string;
  productsID?: Array<string>;
  imageBackground?: string;
}
