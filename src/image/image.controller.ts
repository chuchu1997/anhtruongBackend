import { Controller, Get, Param, Res } from '@nestjs/common';
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
}
