import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Banner } from 'src/schemas/banner.schema';
import { createBannerDto } from './dto/create-banner.dto';
@Injectable()
export class LayoutService {
  constructor(
    @InjectModel(Banner.name) private imageBannerObject: Model<Banner>,
  ) {}
  create(createLayoutDto: CreateLayoutDto) {
    return 'This action adds a new layout';
  }
  async getBanners() {
    return await this.imageBannerObject.find().exec();
  }
  async createBanner(createBannerDto: createBannerDto[]) {
    console.log('CALL THIS 11', createBannerDto.length);
    // try {
    //   console.log('CREATE IAMGE', createProductDto);

    //   // createProductDto.id =
    //   const createdProduct = new this.productModelMongoDB(createProductDto);
    //   return createdProduct.save();
    // } catch (err) {
    //   throw new HttpException(err, HttpStatus.NO_CONTENT);
    // }
    createBannerDto.map((item) => {
      new this.imageBannerObject(item).save();
    });
    return 'IS OK';
    // return await new this.imageBannerObject(createBannerDto).save();
  }
  // async updateBanner(data: ImageDes[]) {
  //   console.log('DATA', data);

  //   data.forEach(async (item) => {
  //     let result = await this.imageBannerObject.find({ id: item.id });
  //     if (result.length > 0) {
  //       console.log('resuilt', result);
  //       // await this.imageBannerObject.findByIdAndDelete
  //     } else {
  //       await new this.imageBannerObject(item).save();
  //     }
  //   });
  //   return 'OK';
  // }

  findAll() {
    return `This action returns all layout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} layout`;
  }

  update(id: number, updateLayoutDto: UpdateLayoutDto) {
    return `This action updates a #${id} layout`;
  }

  remove(id: number) {
    return `This action removes a #${id} layout`;
  }
}
