import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    isAdm: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.createdAt) {
            this.createdAt = new Date() + "";
        }
        if (!this.updatedAt) {
            this.updatedAt = new Date() + "";
        }
    }
}
