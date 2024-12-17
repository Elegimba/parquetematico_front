import { ISchedule } from "./ischedule.interface";
import { IUser } from "./iuser.interface";

export interface IComment {
    id: number;
    users_id: number;
    schedule_id: number;
    comments: string;
    schedule: ISchedule;
    user: IUser
}
