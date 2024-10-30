import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { Product } from 'src/schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModelMongoDB: Model<Product>,
  ) {}

  async fetchAllProducts() {
    return this.productModelMongoDB.find().exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      console.log('CREATE IAMGE', createProductDto);

      // createProductDto.id =
      const createdProduct = new this.productModelMongoDB(createProductDto);
      return createdProduct.save();
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // createProductDto.id =

    let product = await this.productModelMongoDB.findById(id);
    console.log('update ', updateProductDto.imagesObject.length);
    console.log('IMAGE PATH ', product.imagesObject);

    // let arr: any = [];
    // updateProductDto.images.map((instanceUpdate) => {
    //   let productIM = JSON.parse(instanceUpdate.toString());
    //   arr.push(productIM);
    // });
    // const resultsDeleteUpdateImage = product.images.filter(
    //   ({ id: id1 }) => !arr.some(({ id: id2 }) => id2 === id1),
    // );

    // const product = await this.productModelMongoDB
    //   .findByIdAndUpdate(id, updateProductDto, { new: true })
    //   .exec();
    // product.images.map((instanceUpdate) => {});
    // if (!product) {
    //   throw new NotFoundException(`Product with ID ${product.id} not found`);
    // }
    return product;
  }
}
