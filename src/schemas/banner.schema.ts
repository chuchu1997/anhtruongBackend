import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { productImages } from 'src/product/dto/create-product.dto';
import { HydratedDocument, Types } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;
@Schema({ versionKey: false })
export class Banner {
  @Prop({ trim: true })
  title?: string;
  @Prop({ trim: true })
  description?: string;
  @Prop({ trim: true })
  imagePath?: string;
}
export const BannerSchema = SchemaFactory.createForClass(Banner);
