import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {CreateNewsDto} from "../../dto/create-news.dto";
import {NewsEntity} from "../../entities/news.entity";
import {UpdateNewsDto} from "../../dto/update-news.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {CommentsService} from "./comments/comments.service";
import { Cache } from 'cache-manager';



@Injectable()
export class NewsService {
  constructor(@InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>,
              private readonly usersService: UsersService,
              private readonly commentsService: CommentsService,
              @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
  }
  async createNews(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const _user = await this.usersService.getUserById(createNewsDto.userId);
    if (!_user) {
      throw new HttpException(
        'Не существует такого автора', HttpStatus.BAD_REQUEST,
      );
    }

    const newsEntity = new NewsEntity();
    newsEntity.title = createNewsDto.title;
    newsEntity.description = createNewsDto.description;
    newsEntity.createdAt = new Date();
    newsEntity.updatedAt = new Date();
    newsEntity.cover = createNewsDto.cover;
    newsEntity.user = _user;
    return await this.newsRepository.save(newsEntity);

  }

  async findAll(): Promise<NewsEntity[]> {
    const cachedData:NewsEntity[] = await this.cacheService.get(
      'all-news',
    );
    if (cachedData) {
      return cachedData;
    }
    const news=await this.newsRepository.find({relations: ['comments', 'user', 'comments.user']});
    await this.cacheService.set('all-news', news);
    return news;
  }


  async findOneNews(id: number): Promise<NewsEntity> {
    const cachedData:NewsEntity = await this.cacheService.get(
      'one-news',
    );
    if (cachedData) {
      return cachedData;
    }
    const news = await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['comments', 'user', 'comments.user'],
    });

    if (!news) {
      throw new NotFoundException();
    }
    await this.cacheService.set('one-news', news);
    return news;
  }


  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    const news = await this.newsRepository.findOne({
      where: {
        id,
      },
    });

    if (!news) {
      throw new NotFoundException();
    }
    const updatedNews = {
      ...news,
      title: updateNewsDto.title ? updateNewsDto.title : news.title,
      description: updateNewsDto.description ? updateNewsDto.description : news.description,
      updatedAt: new Date()
    };
    await this.newsRepository.save(updatedNews);
    return updatedNews;
  }


  async remove(id: number): Promise<NewsEntity[]> {
    const news = await this.newsRepository.findOneBy({id});
    if (!news) {
      throw new NotFoundException();
    }
    await this.newsRepository.remove(news);
    return await this.newsRepository.find();
  }
}
