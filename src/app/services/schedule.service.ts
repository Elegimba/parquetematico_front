import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Input } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { ISchedule } from "../interfaces/ischedule.interface";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  @Input() userId: string = '';


  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}`;

  getSchedulesByUser(userId: string): Promise<ISchedule[]> {
    return lastValueFrom(
      this.httpClient.get<ISchedule[]>(`${this.baseUrl}/users/${userId}/schedules/`)
    );
  }

  createSchedule(body: ISchedule): Promise<ISchedule> {
    return lastValueFrom(
      this.httpClient.post<ISchedule>(`${this.baseUrl}/schedules`, body)
    )
  }







  editScheduleById(scheduleId: string, body: ISchedule): Promise<ISchedule> {
    return lastValueFrom(
      this.httpClient.put<ISchedule>(`${this.baseUrl}/schedules/${scheduleId}`, body)
    )
  }

  getScheduleById(scheduleId: string): Promise<ISchedule> {
    return lastValueFrom(
      this.httpClient.get<ISchedule>(`${this.baseUrl}/schedules/${scheduleId}`)
    )
  }

}
