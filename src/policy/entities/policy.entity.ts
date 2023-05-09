import { Resource } from "src/resource/entities/resource.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('policies')
export class Policy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: number;

    @Column()
    resourceId: number;

    @ManyToOne(() => Role, role => role.id)
    @JoinColumn()
    role: Role[]

    @ManyToOne(() => Resource, resource => resource.id)
    @JoinColumn()
    resource: Resource[]
}
