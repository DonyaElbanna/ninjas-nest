import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { Ninja } from './interfaces/ninja.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NinjasService {
  constructor(@InjectModel('Ninja') private ninjaModel: Model<Ninja>) {}

  // private ninjas = [
  //   { id: 1, name: 'ninjaA', weapon: 'stars' },
  //   { id: 2, name: 'ninjaB', weapon: 'nunchucks' },
  //   { id: 3, name: 'ninjaC', weapon: 'katana' },
  //   { id: 4, name: 'ninjaD', weapon: 'dagger' },
  //   { id: 4, name: 'ninjaD', weapon: 'stick' },
  // ];

  // getNinjas(weapon?: string) {
  //   if (weapon) {
  //     return this.ninjas.filter((ninja) => ninja.weapon === weapon);
  //   }
  //   return this.ninjas;
  // }

  async getAllNinjas(weapon: string, type: string): Promise<Ninja[]> {
    if (type) {
      return await this.ninjaModel.find({ type: type });
    } else if (weapon) {
      return await this.ninjaModel.find({ weapon: weapon });
    }
    return await this.ninjaModel.find();
  }

  async getNinja(id: string): Promise<Ninja> {
    return await this.ninjaModel.findById(id);
  }

  async createNinja(ninja: Ninja): Promise<Ninja> {
    const newNinja = new this.ninjaModel(ninja);
    return await newNinja.save();
  }

  async deleteNinja(id: string): Promise<Ninja> {
    const deletedNinja = await this.ninjaModel.findByIdAndDelete(id);
    return deletedNinja;
  }

  async updateNinja(id: string, ninja: Ninja): Promise<Ninja> {
    const updatedNinja = await this.ninjaModel.findByIdAndUpdate(id, ninja, {
      new: true,
    });
    return updatedNinja;
  }
}
