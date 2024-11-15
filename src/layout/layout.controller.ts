import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { LayoutService } from './layout.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { Public } from 'src/auth/admin.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateBannerDto } from './dto/create-banner.dto';
import { randomUUID } from 'crypto';
import { UpdateBannerDto } from './dto/update-banner.dto';
@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Post()
  create(@Body() createLayoutDto: CreateLayoutDto) {
    return this.layoutService.create(createLayoutDto);
  }

  @Get()
  findAll() {
    return this.layoutService.findAll();
  }

  @Public()
  @Get('/logo')
  getLogo() {
    return 'http://localhost:5000/image/logo.webp';
  }
  @Public()
  @Post('/logo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        // Define where the file should be saved and the naming convention
        destination: './uploads', // Folder where the images will be stored
        filename: (req, file, callback) => {
          // const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
          let fileName = 'logo.webp';
          callback(null, fileName); // Save with a random name to avoid conflicts
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Max file size (5MB)
      },
    }),
  )
  async changeLogo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return 'Upload Logo Success ';
  }

  @Public()
  @Get('/trang-chu/banners')
  getBannerTrangChu() {
    return this.layoutService.getBanners();
  }
  @Public()
  @Post('/trang-chu/banners')
  async createBanner(@Body() createBannerDto: CreateBannerDto[]) {
    return this.layoutService.createBanner(createBannerDto);
  }
  @Public()
  @Patch('/trang-chu/banners/:id')
  async updateBanner(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    console.log('STRING ', id);
    console.log('UPDATE', updateBannerDto);
  }
  @Public()
  @Delete(':id')
  deleteBanner(@Param('id') id: string) {
    console.log('CALL');
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
    return this.layoutService.update(+id, updateLayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layoutService.remove(+id);
  }
}
