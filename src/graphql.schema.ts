
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class YardInput {
    name: string;
    email: string;
}

export abstract class IQuery {
    abstract getYard(id?: Nullable<number>): Nullable<Yard> | Promise<Nullable<Yard>>;
}

export abstract class IMutation {
    abstract addYard(input: YardInput): Nullable<Yard> | Promise<Nullable<Yard>>;

    abstract updateYard(id: number, email: string): Nullable<Yard> | Promise<Nullable<Yard>>;
}

export class Yard {
    name: string;
    email: string;
}

type Nullable<T> = T | null;
