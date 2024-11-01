import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { productImages } from 'src/product/dto/create-product.dto';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema({ versionKey: false })
export class Category {
  @Prop({ unique: true, trim: true, required: true })
  name: string;
  @Prop({ trim: true })
  description?: string;
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parentCategory?: Category | Types.ObjectId;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
