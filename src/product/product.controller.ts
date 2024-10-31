import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AdminGuard, Public } from 'src/auth/admin.guard';
// import { AdminGuard } from 'src/auth/admin.guard';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateProductDto,
  productImages,
} from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductService } from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //IS PUBLIC ROUTE
  @Public()
  @Get()
  async findAllProducts(@Res() response, @Query() query) {
    let fontPage: number = query.currentPage || 1;
    let product = await this.productService.fetchAllProducts();

    return response.status(HttpStatus.OK).json({ products: product });
  }

  //CREATE NEW PRODUCT
  //JUST ADMIN ACCESS

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
            const filename = uuidv4();
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
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    let mapImagesObject: productImages[] = [];

    files.images.forEach((image) => {
      mapImagesObject.push({
        id: image.filename.split('.')[0],
        path: process.env.HOST + '/image/' + image.filename,
      });
    });

    // const imagesPath = files.images
    //   ? files.images.map((image) => image.path)
    //   : [];
    // console.log('IMAGE PATH ', imagesPath);
    // imagesPath.map((image) =>
    //   mapImagesObject.push({ id: uuidv4(), path: image.filename }),
    // );

    return await this.productService.create({
      ...createProductDto,
      imagesObject: mapImagesObject,
    });
  }
  @Public()
  @Get(':id')
  findOne(@Param(':id') id: string) {
    return;
  }

  //UPDATE NEW PRODUCT
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imagesUpload', maxCount: 5 }, // Adjust the maxCount based on your requirements
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const filename: string = file.originalname.split('.')[0];
            const extension: string = '.webp';
            console.log('FILE NAME', filename);
            callback(null, `${filename}${extension}`);
          },
        }),
        limits: {
          fileSize: 5 * 1024 * 1024, // 5 MB limit
        },
      },
    ),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    // if (updateProductDto.images != null) {
    //   console.log('UPDATE ', updateProductDto.images);
    // }
    // const imagesPath = files.images
    //   ? files.images.map((image) => image.path)
    //   : [];
    // imagesPath.map((imagePath) => {
    //   updateProductDto.images.push({ id: uuidv4(), path: imagePath });
    // });
    // updateProductDto.images
    // return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('CALL DELETE ', id);
    return;
  }
}
