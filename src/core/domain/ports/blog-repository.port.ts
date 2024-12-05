import { Blog } from '../entities/blog.entity';
import { CreateBlogType } from '../types/create-blog-type';
import { UpdateBlogType } from '../types/update-blog-type';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

export interface BlogRepositoryPort {
  findAll(query?: PaginateQuery): Promise<Paginated<Blog>>;
  findById(id: string): Promise<Blog | null>;
  save(blog: Blog): Promise<Blog>;
  delete(id: string): Promise<void>;
  create(blog: CreateBlogType): Blog;
  update(id: string, blog: UpdateBlogType): Promise<Blog>;
}
