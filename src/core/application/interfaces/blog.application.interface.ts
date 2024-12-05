import { Blog } from '../../domain/entities/blog.entity';
import { UpdateBlogDto } from '../../../infrastructure/transport/dto/blog/update-blog-dto';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

export interface BlogApplicationInterface {
  createBlog(title: string, content: string): Promise<Blog>;
  uploadImage(id: string, file: Express.Multer.File): Promise<Blog>;
  updateBlog(id: string, dto: UpdateBlogDto): Promise<Blog>;
  deleteBlog(id: string): Promise<void>;
  getBlog(id: string): Promise<Blog>;
  getBlogs(query?: PaginateQuery): Promise<Paginated<Blog>>;
}
