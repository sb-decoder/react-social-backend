import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('longtext')
  message: string;

  @ApiProperty()
  @Column({ nullable: true })
  creatorId?: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.comments)
  creator: User;

  @ApiProperty()
  @Column({ nullable: true })
  postId?: string;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
