
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class YardInput {
    yard_name: string;
    yard_email: string;
    owner_name: string;
    owner_contact: string;
    city: string;
    state: string;
    pincode: string;
    password: string;
}

export class YardCredential {
    yard_email: string;
    password: string;
}

export abstract class IQuery {
    abstract getYard(id: number): Nullable<Yard> | Promise<Nullable<Yard>>;

    abstract getAllYard(): Nullable<Nullable<Yard>[]> | Promise<Nullable<Nullable<Yard>[]>>;
}

export abstract class IMutation {
    abstract signup(input: YardInput): Nullable<YardRegister> | Promise<Nullable<YardRegister>>;

    abstract login(input: YardCredential): Nullable<YardLogin> | Promise<Nullable<YardLogin>>;

    abstract updateYard(id: number, email: string): Nullable<Yard> | Promise<Nullable<Yard>>;

    abstract signOut(): Nullable<YardLogout> | Promise<Nullable<YardLogout>>;
}

export class YardRegister {
    yard_name: string;
    yard_email: string;
    owner_name: string;
}

export class Yard {
    yard_name: string;
    yard_email: string;
    owner_name: string;
    owner_contact: string;
    city: string;
    state: string;
    pincode: string;
}

export class YardLogin {
    yard_name?: Nullable<string>;
    accessToken?: Nullable<string>;
    role?: Nullable<string>;
}

export class YardLogout {
    message: string;
}

type Nullable<T> = T | null;
