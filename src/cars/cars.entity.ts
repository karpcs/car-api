import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  make: string

  @Column()
  model: string

  @Column({ type: 'timestamptz' })
  year: Date
}
