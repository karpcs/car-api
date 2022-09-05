import { Controller, Get, Post } from '@nestjs/common'
import { CarsService } from './cars.service'

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.getCars()
  }

  @Post('/new')
  createNewCar() {
    return this.carService.createCar()
  }
}
