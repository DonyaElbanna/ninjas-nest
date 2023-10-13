import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'ninjaA', weapon: 'stars' },
    { id: 2, name: 'ninjaB', weapon: 'nunchucks' },
    { id: 3, name: 'ninjaC', weapon: 'katana' },
    { id: 4, name: 'ninjaD', weapon: 'stick' },
  ];

  getNinjas(weapon?: string) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getSingleNinja(id: number) {
    const singleNinja = this.ninjas.find((ninja) => ninja.id === id);
    if (!singleNinja) {
      throw new Error("The Ninja you're looking for can't be located");
    }
    return singleNinja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = { ...createNinjaDto, id: Date.now() };
    this.ninjas.push(newNinja);
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        console.log('updated ninja', { ...ninja, ...updateNinjaDto });
        return { ...ninja, ...updateNinjaDto };
      }
      console.log('not updated', ninja);
      return ninja;
    });
    return this.getSingleNinja(id);
  }

  deleteNinja(id: number) {
    const deletedNinja = this.getSingleNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return deletedNinja;
  }
}
