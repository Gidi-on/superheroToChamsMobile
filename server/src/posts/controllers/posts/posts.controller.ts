import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { Posts } from 'src/typeorm/entities/Posts';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  async createPosts(@Body() post: Posts): Promise<Posts> {
    return await this.postService.createPost(post);
  }

  @Get()
  async getPosts(): Promise<Posts[]> {
    return await this.postService.findAllPosts();
  }

  @Get(':id')
  async getPost(@Param(':id') id: number): Promise<Posts> {
    return await this.postService.findOnePost(id);
  }

  @Put(':id')
  async updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: Posts,
  ): Promise<Posts> {
    return await this.postService.updatePostById(id, post);
  }

  @Delete(':id')
  async deletePostById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postService.deletePostById(id);
  }
}
