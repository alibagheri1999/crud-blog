import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { BlogApplication } from '../../../core/application/blog.application';
import { AuthGuard } from '../../../shared/utils/guard/guard';
import { CreateBlogDto } from '../dto/blog/create-blog-dto';
import { Blog } from '../../../core/domain/entities/blog.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateBlogDto } from '../dto/blog/update-blog-dto';
import { Roles } from '../../../shared/utils/decorators/role.decorator';
import { Role } from '../../../shared/utils/guard/roles';
import { RolesGuard } from '../../../shared/utils/guard/role.guard';
@Controller('/posts')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogApplication) {}

  @Post()
  @Roles(Role.VIEWER, Role.ADMIN)
  async createBlog(@Body() body: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(body.title, body.content);
  }

  @Put('/upload-image/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<Blog> {
    return this.blogService.uploadImage(id, file);
  }

  @Put('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.EDITOR, Role.ADMIN)
  async updateBlog(
    @Param('id') id: string,
    @Body() body: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.updateBlog(id, body);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async deleteBlog(@Param('id') id: string): Promise<string> {
    await this.blogService.deleteBlog(id);
    return 'deleted';
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.VIEWER, Role.ADMIN, Role.EDITOR)
  async getBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogService.getBlog(id);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @Roles(Role.VIEWER, Role.ADMIN, Role.EDITOR)
  async getBlogs(@Paginate() query?: PaginateQuery): Promise<Paginated<Blog>> {
    return this.blogService.getBlogs(query);
  }
}
