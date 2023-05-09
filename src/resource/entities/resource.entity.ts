import { Policy } from "src/policy/entities/policy.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('resources')
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    controller: string;
    
    @Column()
    method: string;
    
    @Column()
    type: string;

    @OneToMany(() => Policy, policy => policy.resourceId)
    policies: Policy[]
}
