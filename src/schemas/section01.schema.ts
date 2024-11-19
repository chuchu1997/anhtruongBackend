import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { productImages } from 'src/product/dto/create-product.dto';
import { HydratedDocument, Types } from 'mongoose';

export type Section01Document = HydratedDocument<Section01>;
@Schema({ versionKey: false })
export class Section01 {
  @Prop({ trim: true })
  title?: string;
  @Prop({ trim: true })
  subTitle?: string;
  @Prop({ trim: true })
  description?: string;
  @Prop()
  features: string[];
  @Prop({ trim: true })
  imagePath?: string;
}
export const Section01Schema = SchemaFactory.createForClass(Section01);
