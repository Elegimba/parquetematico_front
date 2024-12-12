import { IAttraction } from "./iattraction.interface";
import { IUser } from "./iuser.interface";

export interface ISchedule {
    id?: number;
    start_time: string;
    end_time: string;
    attraction: IAttraction;
    users: IUser;
}