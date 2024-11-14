import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { Public } from 'src/auth/admin.guard';

@Controller('image')
export class ImageController {
  @Public()
  @Get(':imgPath')
  async fetchImage(@Res() res, @Param('imgPath') image) {
    // let path = join(__dirname, `../../uploads/${params.path}`);
    // return res.sendFile(image, { root: './files' });
    return res.sendFile(image, { root: './uploads' });

    // return res.sendFile(image, { root: './uploads' });
    // const product = await this.productService.fetchProduct(params.id);
    // return response.status(HttpStatus.OK).json({ product: product });
  }
  @Public()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 }, // Adjust the maxCount based on your requirements
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const filename = randomUUID();
            const extension = '.webp';
            callback(null, `${filename}${extension}`);
          },
        }),
        limits: {
          fileSize: 5 * 1024 * 1024, // 5 MB limit
        },
      },
    ),
  )
  async uploadImages(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    console.log('CALL THIS');
    files.images.map((image) => {
      const getFileName = image.path.split('\\');
      let newImagePath =
        process.env.HOST + '/image/' + getFileName[getFileName.length - 1];
      image.path = newImagePath;
    });
    return files.images;
  }
}
