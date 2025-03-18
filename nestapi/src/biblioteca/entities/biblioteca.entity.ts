import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Biblioteca {
  @PrimaryGeneratedColumn() // Genera un id autoincremental, si sólo fuera clave sería @PrimaryColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
    titulo: string;
  @Column()
    autor: string;
  @Column()
    tema: string;
  @Column()
    editorial: string;
  @Column()
    stock: number;
  @Column()
    precio: number;
}
