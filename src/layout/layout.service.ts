import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Banner } from 'src/schemas/banner.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
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
  async createBanner(createBannerDto: CreateBannerDto[]) {
    createBannerDto.map((item) => {
      new this.imageBannerObject(item).save();
    });
    return 'IS OK';
    // return await new this.imageBannerObject(createBannerDto).save();
  }
  async updateBanner(updateBannerDto: UpdateBannerDto) {
    //CHECK IF CHANGE IMAGE REMOVE OLD IMAGE AND UPDATE
    //IF NOT CHANGE IMAGE JUST UPDATE !!!
    // return await this.imageBannerObject.findByIdAndUpdate(
    //   updateBannerDto._id,
    //   updateBannerDto,
    // );
  }
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
