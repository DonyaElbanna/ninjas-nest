import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('ninjas')
export class NinjasController {

    @Get()
    getAllNinjas(){
        return "All Ninjas";
    }

    @Get(':id')
    getSingleNinja(@Param('id') id: string){
        return `Single Ninja ${id}`;
    }

    @Post()
    createNinja(){
        return "Create Ninja";
    }

    @Put(':id')
    updateNinja(@Param('id') id:string){
        return `Update Ninja ${id}`;
    }

    @Delete(':id')
    deleteNinja(@Param('id') id: string){
        return `Delete Ninja ${id}`;
    }
}