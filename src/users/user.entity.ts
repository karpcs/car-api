import { UserInfo } from "src/user-info/user-info.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToOne(() => UserInfo)
    @JoinColumn()
    userInfo: UserInfo
}