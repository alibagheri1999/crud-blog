import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Blog } from '../domain/entities/blog.entity';
import { MinioFileStorage } from '../../infrastructure/storage/minio/file.storage';
import { BlogRepository } from '../../infrastructure/database/postgres/blog.repository';
import { BlogApplicationInterface } from './interfaces/blog.application.interface';
import { NJRS_REQUEST } from 'nj-request-scope';
import { Request } from 'express';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { UpdateBlogDto } from '../../infrastructure/transport/dto/blog/update-blog-dto';

@Injectable()
export class BlogApplication implements BlogApplicationInterface {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly fileStorage: MinioFileStorage,
    @Inject(NJRS_REQUEST) private readonly request: Request,
  ) {}

  async createBlog(title: string, content: string): Promise<Blog> {
    const blog = this.blogRepository.create({
      title,
      content,
      image: '',
      user_id: this.request?.user?.id,
    });
    return this.blogRepository.save(blog);
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<Blog> {
    let blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    const image = await this.fileStorage.upload(file);
    blog = await this.blogRepository.update(id, { image: image.name });
    return { ...blog, image: image.url };
  }

  async updateBlog(id: string, dto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    if (blog.user_id !== this.request?.user?.id) {
      throw new ForbiddenException('You can not delete this post');
    }
    return await this.blogRepository.update(id, dto);
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    if (blog.user_id !== this.request?.user?.id) {
      throw new ForbiddenException('You can not delete this post');
    }
    return await this.blogRepository.delete(id);
  }

  async getBlog(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    blog.image = await this.fileStorage.downloadFile(blog.image);
    return blog;
  }

  async getBlogs(query?: PaginateQuery): Promise<Paginated<Blog>> {
    const blogs = await this.blogRepository.findAll(query);
    for (const blog of blogs.data) {
      blog.image = await this.fileStorage.downloadFile(blog.image);
    }
    return blogs;
  }
}
