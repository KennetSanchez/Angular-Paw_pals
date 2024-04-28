import { Injectable } from '@angular/core';
import { Pet } from '../const/Pet';
import { delayOnPurpose } from '../utils/tools';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  pets: Pet[] = [
    {
      ownerId: 'o1',
      petId: 'p1',
      name: 'Pulgo',
      description: 'description',
      breed: 'breed',
      age: 1,
      weight: 12,
      height: 100,
      location: 'Salamanca',
    },
    {
      ownerId: 'o1',
      petId: 'p2',
      name: 'Pulgo 2',
      description: 'descripción',
      breed: 'raza',
      age: 2,
      weight: 22,
      height: 200,
      location: 'Iruña',
    },
    {
      ownerId: 'o2',
      petId: 'p3',
      name: 'Matías',
      description: 'Juguetón',
      breed: 'Pitbull',
      age: 10,
      weight: 50,
      height: 120,
      location: 'Guadalajara',
    },
  ];

  async getPets(): Promise<Pet[]> {
    return await delayOnPurpose(this.pets);
  }

  async getPetById(id: string): Promise<Pet | undefined> {
    let pet = this.pets.find((currentPet) => {
      currentPet.petId === id;
    });

    return await delayOnPurpose(pet);
  }

  async getPetsByOwnerId(id: string): Promise<Pet[]>{
    let pets = this.pets.filter((currentPet) => currentPet.ownerId === id)
    return await delayOnPurpose(pets);
  }

  async addPet(
    name: string,
    breed: string,
    age: number,
    weight: number,
    height: number,
    description: string,
    location: string,
    ownerId: string,
  ) {
    const petCount = this.pets.length;

    const petToAdd: Pet = {
      name: name,
      breed: breed,
      description: description,
      location: location,
      age: age,
      weight: weight,
      height: height,
      ownerId: ownerId,
      petId: `p${petCount + 1}`,
    };

    // Just to make time :p
    await delayOnPurpose({}).then(() => {
      this.pets.push(petToAdd);
    });
  }

  async updatePet(
    petId: string,
    ownerId: string,
    name: string,
    breed: string,
    age: number,
    weight: number,
    height: number,
    description: string,
    location: string
  ) {
    const updatedPet: Pet = {
      name: name,
      breed: breed,
      description: description,
      location: location,
      age: age,
      weight: weight,
      height: height,
      ownerId: ownerId,
      petId: petId,
    };

    // Just to make time :p
    await delayOnPurpose({}).then(() => {
      this.pets = this.pets.map((pet) =>
        pet.petId === petId ? updatedPet : pet
      );
    });
  }

  async removePet(petId: string) {
    // Just to make time :p
    await delayOnPurpose({}).then(() => {
      this.pets = this.pets.filter((pet) => pet.petId !== petId);
    });
  }
}
