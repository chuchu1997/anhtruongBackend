import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async excuteSearch(searchField: string) {
    return this.productModel.find({
      $or: [
        { title: { $regex: searchField, $options: 'i' } },
        { hashtag: { $regex: searchField, $options: 'i' } },
        { id: { $regex: searchField, $options: 'i' } },
        { description: { $regex: searchField, $options: 'i' } },
      ],
    });
  }
}
