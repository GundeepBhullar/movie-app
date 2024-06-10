import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5432,
      password: 'post@123',
      username: 'postgres',
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      database: 'movdtb',
      synchronize:true,
      logging:true
    }),
    AuthModule,
    UserModule, 
    MoviesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
