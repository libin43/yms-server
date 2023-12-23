
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract getYard(id?: Nullable<number>): Nullable<Yard> | Promise<Nullable<Yard>>;
}

export class Yard {
    id?: Nullable<number>;
    yardName?: Nullable<string>;
    yardEmail?: Nullable<string>;
}

type Nullable<T> = T | null;
