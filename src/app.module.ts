import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { YardModule } from './yard/yard.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      formatError: (error) => {
        console.log(error,'in gpql error formatter');
        const originalError = error.extensions?.originalError as Error;
       
        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError.message,
          // code: error.extensions?.code,
          status: error.extensions?.status,
          // stacktrace: error.extensions?.stacktrace
        };
      },
    }),

    YardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
