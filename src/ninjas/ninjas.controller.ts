import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Controller('ninjas')
export class NinjasController {
  @Get()
  getAllNinjas(@Query('type') type: string) {
    if (type) {
      return [{ type }];
    }

    return 'All Ninjas';
  }

  @Get(':id')
  getSingleNinja(@Param('id') id: string) {
    return `Single Ninja ${id}`;
  }

  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return {
      name: createNinjaDto.name,
    };
  }

  @Put(':id')
  updateNinja(@Param('id') id: string) {
    return `Update Ninja ${id}`;
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return `Delete Ninja ${id}`;
  }
}
