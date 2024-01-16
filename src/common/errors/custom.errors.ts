import { GraphQLError } from "graphql";

export class CustomGraphQLError extends GraphQLError{


    constructor(status: number, message: string, code ?: string) {
        super(message)
        // this.message = message;
        this.extensions = { code, http: { status } };

    }
    // status: number;

    // message: string;
  
    extensions: {};


    
}