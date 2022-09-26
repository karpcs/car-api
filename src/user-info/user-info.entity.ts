import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string  
}