import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Banner } from 'src/schemas/banner.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import * as path from 'path';
import * as fs from 'fs';
import { Section01 } from 'src/schemas/section01.schema';
@Injectable()
export class LayoutService {
  constructor(
    @InjectModel(Banner.name) private imageBannerObjectModel: Model<Banner>,
    @InjectModel(Section01.name) private Section01Model: Model<Section01>,
  ) {}
  create(createLayoutDto: CreateLayoutDto) {
    return 'This action adds a new layout';
  }
  async getBanners() {
    return await this.imageBannerObjectModel.find().exec();
  }
  async createBanner(createBannerDto: CreateBannerDto) {
    console.log('CREATE BANNER DTO', createBannerDto);
    return await new this.imageBannerObjectModel({ ...createBannerDto }).save();
  }
  async removeImageFromLocalFile(filename: string) {
    const filepath = `./uploads/${filename}`;
    const absolutePath = path.resolve(filepath);
    fs.unlinkSync(absolutePath);
  }
  async deleteBanner(id: string) {
    let object = await this.imageBannerObjectModel.findById(id).exec();
    if (object) {
      let filename = object.imagePath.split('/').pop();
      await this.removeImageFromLocalFile(filename);
      return await this.imageBannerObjectModel.findByIdAndDelete(id).exec();
    }

    // await this.imageBannerObjectModel.findByIdAndDelete(id).exec();
  }
  async updateBanner(updateBannerDto: UpdateBannerDto) {
    console.log('UPDATE', updateBannerDto);
    return await this.imageBannerObjectModel
      .findByIdAndUpdate(updateBannerDto._id, { ...updateBannerDto })
      .exec();
  }

  /// HANDLE FOR SECTION 01 ;
  async getSection01Layout() {
    return await this.Section01Model.findOne({}).exec();
  }
}
