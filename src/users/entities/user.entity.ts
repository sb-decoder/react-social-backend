import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Post } from 'src/posts/entities/post.entity';
import { File } from 'src/files/entities/file.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (posts) => posts.creator)
  posts: Post[];

  @OneToMany(() => File, (files) => files.creator)
  files: File[];

  @ApiProperty()
  @Column({ nullable: true })
  imageId: number;

  @OneToOne(() => File)
  @JoinColumn()
  image: File;

  @ApiProperty()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
