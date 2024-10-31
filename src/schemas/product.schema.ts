import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { productImages } from 'src/product/dto/create-product.dto';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ versionKey: false })
export class Product {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true })
  title: string;
  @Prop()
  description: string;
  @Prop()
  categoryID: string;
  @Prop()
  imagesObject: Array<productImages>;
  @Prop()
  price: string;
  @Prop()
  hashtag?: Array<string>;
  @Prop()
  amount: number;
  @Prop()
  dropshipFrom: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
