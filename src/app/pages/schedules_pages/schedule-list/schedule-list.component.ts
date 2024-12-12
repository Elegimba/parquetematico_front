import { Component, inject, Input } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { ISchedule } from '../../../interfaces/ischedule.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { StaffService } from '../../../services/staff.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


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
  schedule: ISchedule | null = null;
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

  addComment() {


  }

  async deleteOnClick(attractionName: string, scheduleId: number) {
    const confirm = await Swal.fire({ title: `¿Quieres eliminar este horario para ${attractionName}?`, icon: 'warning', confirmButtonText: 'Confirmar', showCancelButton: true });
    console.log(scheduleId)
    if(confirm.isConfirmed) {
      try {        
        await this.scheduleService.deleteSchedule(scheduleId);
        Swal.fire('Borrado', '', 'success');
        this.schedules = await this.scheduleService.getSchedulesByUser(this.userId);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
