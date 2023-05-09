import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;
    
    @Column({ default: false })
    is_super_admin: boolean;

    @Column()
    roleId: number;

    @OneToOne(() => Role, role => role.id)
    @JoinColumn()
    role: Role;
}
