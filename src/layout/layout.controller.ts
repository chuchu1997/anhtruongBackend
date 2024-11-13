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
    return 'http://localhost:5000/image/logo.jpg';
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
function uuidv4() {
  throw new Error('Function not implemented.');
}
