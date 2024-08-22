import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { productImages } from 'src/product/dto/create-product.dto';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ versionKey: false })
export class Product {
  @Prop({ unique: true })
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
  hashtag: Array<string>;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
