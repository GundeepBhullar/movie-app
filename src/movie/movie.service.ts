import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from 'src/dto/create-movie.dto';

@Injectable()
export class MovieService implements OnModuleInit{
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
    ) {}

    async onModuleInit() {
        const initialMovies= [
            'Jihne Mera Dil Luteya -By Gippy Grewal',
            'Race -By Saif',
            'Chamkila -By Diljit',
            'Hero -By Jimmy Shergil',
            'Animal -By Ranbir Kapoor',
            'Housefull -By Akshey',
            'Jisam -By Cast',
            'Murder -By Cast',
            'Qismat -By Ammy Virk'
        ];

        for (const name of initialMovies) {
            const movieExists = await this.movieRepository.findOne({where: { name }});
            if (!movieExists) {
                const movie = new Movie();
                movie.name = name;
                await this.movieRepository.save(movie);
            }
        }
    }
    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie = new Movie();
        movie.name = createMovieDto.name;
        return this.movieRepository.save(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }
}
