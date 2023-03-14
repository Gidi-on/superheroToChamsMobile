import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './../../../typeorm/entities/Posts';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async createPost(post: Posts): Promise<Posts> {
    const newPost = this.postRepository.create({
      ...post,
      createdAt: new Date(),
    });

    return await this.postRepository.save(newPost);
  }

  async findAllPosts(): Promise<Posts[]> {
    return await this.postRepository.find();
  }

  async findOnePost(id: number): Promise<Posts> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updatePostById(id: number, post: Posts): Promise<Posts> {
    await this.postRepository.update({ id }, { ...post });
    return await this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deletePostById(id: number) {
    return await this.postRepository.delete({ id });
  }
}
