import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMovieDto } from 'src/dto/create-movie.dto';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.create(createMovieDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.movieService.findAll();
    }
}
