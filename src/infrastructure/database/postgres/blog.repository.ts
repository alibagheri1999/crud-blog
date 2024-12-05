import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../../../core/domain/entities/blog.entity';
import { BlogRepositoryPort } from '../../../core/domain/ports/blog-repository.port';
import { CreateBlogType } from '../../../core/domain/types/create-blog-type';
import { UpdateBlogType } from '../../../core/domain/types/update-blog-type';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class BlogRepository implements BlogRepositoryPort {
  constructor(
    @InjectRepository(Blog)
    private readonly repository: Repository<Blog>,
  ) {}

  async findAll(query?: PaginateQuery): Promise<Paginated<Blog>> {
    const queryBuilder = this.repository
      .createQueryBuilder('blog')
      .leftJoin('blog.user', 'user');
    return await paginate<Blog>(query, queryBuilder, {
      sortableColumns: ['id'],
      searchableColumns: ['id'],
      defaultSortBy: [['id', 'DESC']],
    });
  }

  async findById(id: string): Promise<Blog | null> {
    return this.repository.findOne({ where: { id } });
  }

  async save(blog: Blog): Promise<Blog> {
    return this.repository.save(blog);
  }

  async update(id: string, blog: UpdateBlogType): Promise<Blog> {
    await this.repository.update(id, blog);
    return await this.findById(id);
  }

  create(blog: CreateBlogType): Blog {
    return this.repository.create(blog);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
