export interface IUser {
    id: number;
    name: string;
    surnames: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    admin = 'admin',
    worker = 'worker'
}
