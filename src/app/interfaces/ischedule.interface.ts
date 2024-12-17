import { IAttraction } from "./iattraction.interface";
import { IComment } from "./icomment.interface";
import { IUser } from "./iuser.interface";

export interface ISchedule {
    id?: number;
    start_time: Date;
    end_time: Date;
    attraction: IAttraction;
    users: IUser;
    comment?: IComment;
}