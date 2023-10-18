import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { Ninja } from './interfaces/ninja.interface';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor) // Automatically cache the response for all get routes handled in the controller
@Controller('ninjas')
export class NinjasController {
  constructor(private ninjasService: NinjasService) {}

  @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  @CacheTTL(50000) // override TTL to 50 seconds, default is 5
  @Get()
  getAllNinjas(
    @Query('weapon') weapon: string,
    @Query('type') type: string,
  ): Promise<Ninja[]> {
    return this.ninjasService.getAllNinjas(weapon, type);
  }

  @Get(':id')
  getSingleNinja(@Param('id') id: string): Promise<Ninja> {
    return this.ninjasService.getNinja(id);
  }

  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto): Promise<Ninja> {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string): Promise<Ninja> {
    return this.ninjasService.deleteNinja(id);
  }

  @Put(':id')
  updateNinja(
    @Param('id') id: string,
    @Body() updateNinjaDto: CreateNinjaDto,
  ): Promise<Ninja> {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }
}
