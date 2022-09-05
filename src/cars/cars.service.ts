import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Car } from './cars.entity'

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  createCar() {
    const newCar = this.carsRepository.create({
      make: 'Audi',
      model: 'A6',
      year: new Date(),
    })
    return this.carsRepository.save(newCar)
  }

  getCars(): Promise<Car[]> {
    return this.carsRepository.find()
  }
}
