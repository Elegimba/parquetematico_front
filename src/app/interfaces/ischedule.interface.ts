import { IAttraction } from "./iattraction.interface";

export interface ISchedule {
    id: number;
    start_time: string
    end_time: string;
    attraction: IAttraction;
}