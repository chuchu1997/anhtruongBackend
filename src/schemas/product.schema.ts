import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { productImages } from 'src/product/dto/create-product.dto';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ versionKey: false })
export class Product {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true })
  title: string;
  @Prop({ trim: true })
  description: string;
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | Types.ObjectId;
  @Prop()
  imagesObject: Array<productImages>;
  @Prop()
  price: string;
  @Prop()
  hashtag?: Array<string>;
  @Prop()
  amount: number;
  @Prop()
  dropshipFrom: string;
  @Prop()
  bestSelling?: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
