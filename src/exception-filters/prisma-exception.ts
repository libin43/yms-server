import { ArgumentsHost, Catch, ConflictException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)

export class PrismaClientExceptionFilter implements GqlExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError): any {
        console.error(exception);

        switch (exception.code) {
            
            case 'P2002': {
                throw new ConflictException(`Not Unique ${exception.meta.target}`);
              }
              default:
                break;
        }
        return exception;
    }
}