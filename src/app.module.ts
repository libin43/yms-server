import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({req, res}) => ({req, res}),
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      subscriptions: {
        'graphql-ws': true,
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      status400ForVariableCoercionErrors: true,
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
          code: error.extensions?.code,
          // stacktrace: error.extensions?.stacktrace
        };
      },
    }),
    VehicleModule,
    UserModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
