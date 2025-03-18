import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Alumno {
  @PrimaryGeneratedColumn() // Genera un id autoincremental, si sólo fuera clave sería @PrimaryColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
    nombre: string;
  @Column({ unique: true })
    email: string;
  @Column()
    password: string;
  @Column({ default: true })
    activo: boolean;
  @CreateDateColumn() // Fecha de creación automática
    fechaCreacion: Date;
  @UpdateDateColumn() // Fecha de actualización automática
    fechaActualizacion: Date;
}