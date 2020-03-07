import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ nullable: false })
  filename: string;

  @Column({ nullable: false })
  path: string;

  @Column() youtubeId: string;
}
