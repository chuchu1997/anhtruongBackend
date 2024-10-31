import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from 'src/auth/admin.guard';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Public()
  @Get()
  async search(@Res() response, @Query() query) {
    console.log('CALL');
    let { searchField } = query;
    let result = await this.searchService.excuteSearch(searchField);
    return response.status(HttpStatus.OK).json({ searchResults: result });
    // return response.status(HttpStatus.OK).json({ test: 'Hello' });
  }
}
