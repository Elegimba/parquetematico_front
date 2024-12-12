import { Component, inject, Input } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { ISchedule } from '../../../interfaces/ischedule.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { StaffService } from '../../../services/staff.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css'
})
export class ScheduleListComponent {

  @Input() userId: string = '';

  scheduleService = inject(ScheduleService);
  staffService = inject(StaffService)
  schedules: ISchedule[] = [];
  user: IUser | null = null;


  async ngOnInit() {
    try {
      this.schedules = await this.scheduleService.getSchedulesByUser(this.userId);
      console.log(this.schedules);
      this.user = await this.staffService.getById(this.userId);
    } catch (error) {
      console.log(error);
    }
  }

}
